import {spfi, SPFx} from "@pnp/sp";
import {Web} from "@pnp/sp/webs";

// Initialize the SharePoint client using spfi
export const setupSP = (accessToken) => {
  const sp = spfi().using(
    SPFx({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  );
  return sp;
};

export const getDocuments = async (siteUrl) => {
  const web = Web(siteUrl);
  const documents = await web.lists.getByTitle("Documents").items.get();
  return documents;
};
