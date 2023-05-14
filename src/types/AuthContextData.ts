import { SignProps } from "./SignProps";
import { SignUpProps } from "./SignUpProps";
import { UserProps } from "./UserProps";

export type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
}
