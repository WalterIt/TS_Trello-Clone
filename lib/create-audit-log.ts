import { auth, currentUser } from "@clerk/nextjs";
import { ACTION, ENTITY_TIPE } from "@prisma/client";
import { db } from "./db";

interface Props {
    entityId: string;
    entityType: ENTITY_TIPE;
    entityTitle: string;
    action: ACTION;
}

export const createAuditLog = async (props: Props) => {
    try {
        const { orgId } = auth();
        const user = await currentUser();

        // console.log(user?.externalAccounts[0]?.username)

        if(!user || !orgId ) throw new Error("User not found!");

        const { entityId, entityType, entityTitle, action } = props;

        await db.auditLog.create({
            data: {
                orgId,
                entityId,
                entityType,
                entityTitle,
                action,
                userId: user.id,
                userImage: user?.imageUrl,
                userName: user?.externalAccounts[0]?.username!,
            }
        })
        
    } catch (error) {
        console.log("[AUDIT_LOG_ERROR]", error)
    }
}