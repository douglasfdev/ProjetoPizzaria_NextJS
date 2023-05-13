import { SignProps } from "./SignProps";
import { UserProps } from "./UserProps";

export type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignProps) => Promise<void>;
}
