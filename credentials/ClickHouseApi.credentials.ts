import {
	ICredentialType,
	NodePropertyTypes,
} from 'n8n-workflow';

export class ClickHouseApi implements ICredentialType {
	name = 'clickHouseApi';
	displayName = 'ClickHouse API';
	properties = [
		{
			displayName: 'Host',
			name: 'host',
			type: 'string' as NodePropertyTypes,
			default: 'http://localhost:8123',
		},
		{
			displayName: 'Username',
			name: 'username',
			type: 'string' as NodePropertyTypes,
			default: '',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string' as NodePropertyTypes,
			default: '',
			typeOptions: {
				password: true,
			},
		},
		{
			displayName: 'Database',
			name: 'database',
			type: 'string' as NodePropertyTypes,
			default: 'default',
		},
	];
}
