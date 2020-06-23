export enum OauthType {
  Github = 'Github',
}

export interface OauthParam {
  type: OauthType;
  code: string;
}

export interface OauthInfo {
  type: OauthType;
  [propName: string]: any;
}

export interface IOauth {
  getOauthInfo(): Promise<OauthInfo>;
}
