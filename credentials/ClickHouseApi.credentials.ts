import {
	ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class ClickHouseApi implements ICredentialType {
	name = 'clickHouseApi';
	displayName = 'ClickHouse API';
	documentationUrl = 'https://clickhouse.com/docs/en/interfaces/http/';
	properties: INodeProperties[] = [
		{
			displayName: 'Host',
			name: 'host',
			type: 'string',
			default: 'http://localhost:8123',
		},
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			},
		},
		{
			displayName: 'Database',
			name: 'database',
			type: 'string',
			default: 'default',
		},
	];
}
