import { User } from "next-auth"
import { JWT } from "next-auth/jwt"

// We are extending the JWT and Session types from next-auth to add our own properties.
// We are adding the id property to the JWT type and the user.id property to the Session type.
// We are doing this because we want to be able to access the user id in the JWT and Session objects.
// We will use the user id to query the database to get the user data.

type UserId = string

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId
    }
  }
}