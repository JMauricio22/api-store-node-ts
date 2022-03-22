export interface MailInfo {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export interface ChangePassword {
  newPassword: string;
  token: string;
}

export interface Auth {
  user: string;
  pass: string;
}
