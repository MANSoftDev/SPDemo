using System;
using System.Runtime.InteropServices;
using System.Security.Permissions;
using Microsoft.SharePoint;
using Microsoft.SharePoint.Security;

namespace SPUGDemo.Features.Create_List
{
    /// <summary>
    /// This class handles events raised during feature activation, deactivation, installation, uninstallation, and upgrade.
    /// </summary>
    /// <remarks>
    /// The GUID attached to this class may be used during packaging and should not be modified.
    /// </remarks>

    [Guid("dff59a31-eb2b-4aca-8e9e-7ec9a552bd4b")]
    public class Create_ListEventReceiver : SPFeatureReceiver
    {
        private const string CONTACT_LIST_NAME = "SPUG Demo Contacts";
        // Uncomment the method below to handle the event raised after a feature has been activated.

        public override void FeatureActivated(SPFeatureReceiverProperties properties)
        {
            SPWeb web = properties.Feature.Parent as SPWeb;
            if(web != null)
            {
                // Check if the list already exists
                SPList list = web.Lists.TryGetList(CONTACT_LIST_NAME);
                if(list == null)
                {
                    Guid listId = web.Lists.Add(CONTACT_LIST_NAME, "SPUG Demo Contacts", SPListTemplateType.Contacts);
                    list = web.Lists[listId];
                }

                // Only add items if the list is empty
                if(list.Items.Count == 0)
                {
                    SPListItem item = list.Items.Add();
                    item["Title"] = "Fudd";
                    item["First Name"] = "Elmer";
                    item["Company"] = "Acme, Inc.";
                    item["Address"] = "One Acme Way";
                    item["City"] = "Albuquerque";
                    item["State/Province"] = "NM";
                    item.Update();

                    item = list.Items.Add();
                    item["Title"] = "Leghorn";
                    item["First Name"] = "Foghorn";
                    item["Company"] = "Acme, Inc.";
                    item["Address"] = "One Acme Way";
                    item["City"] = "Albuquerque";
                    item["State/Province"] = "NM";
                    item.Update();

                    item = list.Items.Add();
                    item["Title"] = "Bunny";
                    item["First Name"] = "Bugs";
                    item["Company"] = "Acme, Inc.";
                    item["Address"] = "One Acme Way";
                    item["City"] = "Albuquerque";
                    item["State/Province"] = "NM";
                    item.Update();
                }
            }
        }

        // Uncomment the method below to handle the event raised before a feature is deactivated.

        public override void FeatureDeactivating(SPFeatureReceiverProperties properties)
        {
            SPWeb web = properties.Feature.Parent as SPWeb;
            if(web != null)
            {
                SPList list = web.Lists.TryGetList(CONTACT_LIST_NAME);
                if(list != null)
                {
                    list.Delete();
                }
            }
        }


        // Uncomment the method below to handle the event raised after a feature has been installed.

        //public override void FeatureInstalled(SPFeatureReceiverProperties properties)
        //{
        //}


        // Uncomment the method below to handle the event raised before a feature is uninstalled.

        //public override void FeatureUninstalling(SPFeatureReceiverProperties properties)
        //{
        //}

        // Uncomment the method below to handle the event raised when a feature is upgrading.

        //public override void FeatureUpgrading(SPFeatureReceiverProperties properties, string upgradeActionName, System.Collections.Generic.IDictionary<string, string> parameters)
        //{
        //}
    }
}
