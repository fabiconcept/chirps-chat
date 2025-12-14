enum ROLES {
    OWNER = "owner",
    ADMIN = "admin",
    MEMBER = "member"
}

enum PERMISSIONS {
    CAN_VIEW = "can_view",
    CAN_EDIT = "can_edit",
    CAN_DELETE = "can_delete",
    CAN_MODERATE = "can_moderate"
};


export interface Settings {
    title: string;
    key: string;
    description: string;
    permission: {
        [ROLES.OWNER]: PERMISSIONS[],
        [ROLES.ADMIN]: PERMISSIONS[],
        [ROLES.MEMBER]: PERMISSIONS[]
    };
}

const SETTINGS_TABS: Settings[] = [
    {
        title: "Room Profile",
        key: "room-profile",
        description: "Customise how Room appears in invite links and, if enabled, in search results",
        permission: {
            [ROLES.OWNER]: [PERMISSIONS.CAN_VIEW, PERMISSIONS.CAN_EDIT, PERMISSIONS.CAN_DELETE, PERMISSIONS.CAN_MODERATE],
            [ROLES.ADMIN]: [PERMISSIONS.CAN_VIEW, PERMISSIONS.CAN_EDIT, PERMISSIONS.CAN_DELETE, PERMISSIONS.CAN_MODERATE],
            [ROLES.MEMBER]: [PERMISSIONS.CAN_VIEW]
        }
    },
    {
        title: "Per-Room Profile",
        key: "per-room-profile",
        description: "Customise your profile for this room",
        permission: {
            [ROLES.OWNER]: [PERMISSIONS.CAN_VIEW, PERMISSIONS.CAN_EDIT, PERMISSIONS.CAN_DELETE, PERMISSIONS.CAN_MODERATE],
            [ROLES.ADMIN]: [PERMISSIONS.CAN_VIEW, PERMISSIONS.CAN_EDIT, PERMISSIONS.CAN_DELETE, PERMISSIONS.CAN_MODERATE],
            [ROLES.MEMBER]: [PERMISSIONS.CAN_VIEW, PERMISSIONS.CAN_EDIT]
        }
    },
    {
        title: "Engagement",
        key: "engagement",
        description: "Manage how users interact with your room",
        permission: {
            [ROLES.OWNER]: [PERMISSIONS.CAN_VIEW, PERMISSIONS.CAN_EDIT, PERMISSIONS.CAN_DELETE, PERMISSIONS.CAN_MODERATE],
            [ROLES.ADMIN]: [PERMISSIONS.CAN_VIEW, PERMISSIONS.CAN_EDIT, PERMISSIONS.CAN_MODERATE],
            [ROLES.MEMBER]: []
        }
    },
    {
        title: "Members",
        key: "members",
        description: "Manage members in your room",
        permission: {
            [ROLES.OWNER]: [PERMISSIONS.CAN_VIEW, PERMISSIONS.CAN_EDIT, PERMISSIONS.CAN_DELETE, PERMISSIONS.CAN_MODERATE],
            [ROLES.ADMIN]: [PERMISSIONS.CAN_VIEW, PERMISSIONS.CAN_EDIT, PERMISSIONS.CAN_MODERATE],
            [ROLES.MEMBER]: [PERMISSIONS.CAN_VIEW]
        }
    },
    {
        title: "Invites",
        key: "invites",
        description: "Manage invites to your room",
        permission: {
            [ROLES.OWNER]: [PERMISSIONS.CAN_VIEW, PERMISSIONS.CAN_EDIT, PERMISSIONS.CAN_DELETE, PERMISSIONS.CAN_MODERATE],
            [ROLES.ADMIN]: [PERMISSIONS.CAN_VIEW, PERMISSIONS.CAN_EDIT, PERMISSIONS.CAN_MODERATE],
            [ROLES.MEMBER]: []
        }
    },
    {
        title: "Safety & Security",
        key: "safety-security",
        description: "Manage safety and security for your room",
        permission: {
            [ROLES.OWNER]: [PERMISSIONS.CAN_VIEW, PERMISSIONS.CAN_EDIT, PERMISSIONS.CAN_DELETE, PERMISSIONS.CAN_MODERATE],
            [ROLES.ADMIN]: [PERMISSIONS.CAN_VIEW, PERMISSIONS.CAN_EDIT, PERMISSIONS.CAN_DELETE, PERMISSIONS.CAN_MODERATE],
            [ROLES.MEMBER]: []
        }
    },
    {
        title: "Bans",
        key: "bans",
        description: "Manage bans in your room",
        permission: {
            [ROLES.OWNER]: [PERMISSIONS.CAN_VIEW, PERMISSIONS.CAN_EDIT, PERMISSIONS.CAN_DELETE, PERMISSIONS.CAN_MODERATE],
            [ROLES.ADMIN]: [PERMISSIONS.CAN_VIEW, PERMISSIONS.CAN_EDIT, PERMISSIONS.CAN_DELETE, PERMISSIONS.CAN_MODERATE],
            [ROLES.MEMBER]: []
        }
    },
    {
        title: "Delete Room",
        key: "delete-room",
        description: "Permanently delete this room and all its data",
        permission: {
            [ROLES.OWNER]: [PERMISSIONS.CAN_VIEW, PERMISSIONS.CAN_EDIT, PERMISSIONS.CAN_DELETE, PERMISSIONS.CAN_MODERATE],
            [ROLES.ADMIN]: [],
            [ROLES.MEMBER]: []
        }
    }
]

export { SETTINGS_TABS as default, ROLES, PERMISSIONS };