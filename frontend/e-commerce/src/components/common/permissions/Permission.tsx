import { useState, useEffect, useContext } from "react";
import { User, Roles } from "@/context/types/Auth.types";
import { AuthContext } from "@/context/AuthProvider";
import { checkPermission } from "./checkPermission";
import { Debug, EntityOwnerId } from "./permission.types";

type PermissionType = "one-of" | "all-of";

export type PermissionProps = {
  children: React.ReactNode;
  noAccess?:
    | React.ReactNode
    | ((args: { user: User | null; hasAccess: boolean }) => React.ReactNode);
  roles: Roles[];
  type?: PermissionType;
  entityOwnerId?: EntityOwnerId;
  debug?: Debug;
};

const Permission = (props: PermissionProps) => {
  const {
    children,
    noAccess,
    roles,
    type = "one-of",
    entityOwnerId,
    debug,
  } = props;

  const user = useContext(AuthContext).authState.user;

  const [hasAccess, setHasAccess] = useState(
    user ? checkPermission(user, roles, { type, entityOwnerId, debug }) : false
  );

  useEffect(() => {
    if (!user) {
      setHasAccess(false);
      return;
    }

    const doesHaveAccess = checkPermission(user, roles, {
      type,
      entityOwnerId,
      debug,
    });
    setHasAccess(doesHaveAccess);
  }, [user?.id, user?.roles, entityOwnerId, roles, type]);

  const renderNoAccess = () => {
    if(typeof noAccess === 'function') {
      return noAccess({
        user,
        hasAccess
      });
    }
  };

  return hasAccess ? children : renderNoAccess() || null;
};

export default Permission;
