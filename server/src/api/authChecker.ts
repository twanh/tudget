import { AuthChecker } from "type-graphql";
import { MyContext } from "../types/types";
/**
 * Check if the user is logged in
 * @returns boolean
 */
export const authChecker: AuthChecker<MyContext> = ({ context: { req } }) => {
  // If the session.userId is defined then the user is logged in
  return req.session!.userId;
};
