export interface GithubProfile {
  id: string;
  username: string;
  displayName: string;
  profileUrl: string;
  photos: Array<{ value: string }>;
  emails: Array<{ value: string }>;
  _json: { [key: string]: any };
}
