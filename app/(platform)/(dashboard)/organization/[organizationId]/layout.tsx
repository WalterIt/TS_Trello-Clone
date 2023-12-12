import { startCase } from "lodash";
import { OrganizationControl } from "./_components/organization-control";
import { auth } from "@clerk/nextjs";

export async function generateMetadata() {
    const { orgSlug } = auth();

    return {
        title: startCase(orgSlug || "Organization"),
    }
    
}

const OrganizationIdLayout = ({ children }: { children: React.ReactNode}) => {
    return ( 
        <>
            <OrganizationControl />
            {children}
        </>
     );
}
 
export default OrganizationIdLayout;