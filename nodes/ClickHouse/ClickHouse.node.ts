import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,          // <-- ✅ Add this line
} from 'n8n-workflow';

export class ClickHouse implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ClickHouse',
		name: 'clickHouse',
		group: ['input'],
		version: 1,
		description: 'Execute SQL queries on ClickHouse',
		defaults: {
			name: 'ClickHouse',
		},
		inputs: <NodeConnectionType[]>['main'],
        outputs: <NodeConnectionType[]>['main'],
		credentials: [
			{
				name: 'clickHouseApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Query',
						value: 'query',
					},
					{
						name: 'Insert',
						value: 'insert',
					},
				],
				default: 'query',
			},
			{
				displayName: 'SQL',
				name: 'sql',
				type: 'string',
				default: '',
				description: 'Enter the SQL query or INSERT statement',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const credentials = await this.getCredentials('clickHouseApi') as {
			host: string;
			username: string;
			password: string;
			database: string;
		};

		const host = credentials.host.replace(/\/$/, '');
		const username = credentials.username;
		const password = credentials.password;
		const database = credentials.database;

		for (let i = 0; i < items.length; i++) {
			const operation = this.getNodeParameter('operation', i) as string;
			const sql = this.getNodeParameter('sql', i) as string;

			const uri = `${host}/?database=${database}` + (operation === 'query' ? '&default_format=JSON' : '');

			const options: Record<string, any> = {
				method: 'POST',
				uri,
				auth: {
					user: username,
					pass: password,
				},
				body: sql,
				headers: {
					'Content-Type': 'text/plain',
				},
			};

			const response = await this.helpers.request(options);

			if (operation === 'query') {
				const parsed = typeof response === 'string' ? JSON.parse(response) : response;
				for (const row of parsed.data) {
					returnData.push({ json: row });
				}
			} else {
				returnData.push({ json: { success: true, executed: sql } });
			}
		}

		return [returnData];
	}
}
