enum OauthType {
  Github = 'github',
}

interface OauthParam {
  type: OauthType;
  code: string;
}

interface OauthInfo {
  type: OauthType;
  [propName: string]: any;
}

interface IOauth {
  getOauthInfo(): Promise<OauthInfo>;
}

export { OauthType, OauthParam, OauthInfo, IOauth };
