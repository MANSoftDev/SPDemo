var LIST_NAME = 'SPUG_Demo_Contacts';

// Global variable to hold selected ListItem
var listItem;
// Global variable to hold id of selected item
var selectedItemId;

$(document).ready(function ()
{   
    // Load all contacts
    loadContactsList();

    // Initially hidden
    $("#details").hide();
});

/// Function to notify of any failure for executeQueryAsync
function onFail(sender, args)
{
    alert(args.get_message());
}

/// Retrieve all contacts in the list
function loadContactsList()
{
    var ctx = SP.ClientContext.get_current();
    var web = ctx.get_web();
    var list = web.get_lists().getByTitle(LIST_NAME);

    var camlQuery = new SP.CamlQuery();
    var queryXml = "<View>" +
                        "<Query>" +
                            "<OrderBy>" +
                                "<FieldRef Name='Title'/>" +
                                "<FieldRef Name='FirstName'/>" +
                            "</OrderBy>" +
                        "</Query>" +
// Can specify fields here
//                        "<ViewFields>" +
//                            "<FieldRef Name='ID'/>" +
//                            "<FieldRef Name='Title'/>" +
//                            "<FieldRef Name='FirstName'/>" +
//                        "</ViewFields>" +
                    "</View>";

    camlQuery.set_viewXml(queryXml);
    this.listItems = list.getItems(camlQuery);
    // Can use this or LoadQuery
    //ctx.load(this.listItems);
    // Fields can be included here rather than in CAML
    ctx.load(this.listItems, 'Include(ID, Title, FirstName)');

    ctx.executeQueryAsync(
            Function.createDelegate(this, onLoadContactsSuccess),
            Function.createDelegate(this, onFail));
}

/// Function to be called after executeQueryAsync
/// in loadContactsList has been successful 
function onLoadContactsSuccess(sender, args)
{
    $("#contactList").empty();

    if(this.listItems.get_count() == 0)
    {
        $("#contactList").append("<span>No contacts found</span>");
    }
    else
    {
        // Get Enumerator and iterate through it
        var listEnumerator = this.listItems.getEnumerator();
        while (listEnumerator.moveNext())
        {
            var item = listEnumerator.get_current();

            // Properties on FieldValues will match
            // Fields returned by query
            var title = item.get_fieldValues().Title;
            var firstName = item.get_fieldValues().FirstName;
            var id = item.get_fieldValues().ID;

            // Create the html element
            var contact = "<span onclick='displayContactDetails(" + id + ")'>" + firstName + " " + title + "</span>";

            // Append to "list"
            $("#contactList").append(contact + "<br/>");
        }
    }
}

/// Function call by onClick event of contact item
/// id: ID of contact to display details for
function displayContactDetails(id)
{
    selectedItemId = id;
    var ctx = SP.ClientContext.get_current();
    var web = ctx.get_web();
    var list = web.get_lists().getByTitle(LIST_NAME);

    listItem = list.getItemById(id);

    // Returns all fields
    //ctx.load(this.listItem);

    // Returns only fields specified
    ctx.load(this.listItem, "Title", "FirstName", "WorkAddress", "WorkCity", "WorkState", "WorkZip");

    ctx.executeQueryAsync(
            Function.createDelegate(this, onContactDetailsSuccess),
            Function.createDelegate(this, onFail));
}

/// Function to be called after executeQueryAsync
/// in displayContactDetails has been successful 
function onContactDetailsSuccess(sender, args)
{
    // Make sure details controls are visible if not already
    if(!$("#details").is(":visible"))
    {
        $("#details").show();
    }
    resetFields();

    $("#FirstName").text(listItem.get_fieldValues().FirstName);
    $("#Title").text(listItem.get_fieldValues().Title);
    $("#WorkAddress").text(listItem.get_fieldValues().WorkAddress);
    $("#WorkCity").text(listItem.get_fieldValues().WorkCity);
    $("#WorkState").text(listItem.get_fieldValues().WorkState);
    $("#WorkZip").text(listItem.get_fieldValues().WorkZip == null ? "" : listItem.get_fieldValues().WorkZip);
}

/// Edit button event handler
function onEdit()
{
    if($("#edit").val() == "Edit")
    {
        $(".field").each(function ()
        {
            $(this).hide();
            $(this).after("<input type='text' value='" + $(this).text() + "'/>");
        });
        $("#edit").val("Save");
    }
    else
    {
        saveContact();
    }
}

/// Remove all edit fields and replace
/// display fields
function resetFields()
{
    $(".field").each(function ()
    {
        $(this).text($(this).next("input").val());
        $(this).show();
        $(this).next("input").remove();
    });
    $("#edit").val("Edit");
}

/// Update contact with new values and save
/// to list
function saveContact()
{
    $(".field").each(function ()
    {
        var id = $(this).attr("ID");
        var value = $(this).next("input").val();

        listItem.set_item(id,value);
    });
    
    listItem.update();

    var ctx = SP.ClientContext.get_current();
    
    ctx.executeQueryAsync(
            Function.createDelegate(this, onSaveContactSuccess),
            Function.createDelegate(this, onFail));
}

/// Function to be called after executeQueryAsync
/// in displayContactDetails has been successful 
function onSaveContactSuccess()
{
    SP.UI.Notify.addNotification("Contact updated", false); 
    resetFields();
}

/// Event handler for AddContact button
function onNewContact()
{
    var options = {
        url: "/_layouts/SPUGDemo/NewContact.aspx",
        allowMaximize: false,
        showClose: true,
        height: 200,
        width: 500,
        dialogReturnValueCallback: onCloseNewContact
    };

    SP.UI.ModalDialog.showModalDialog(options);
}

/// Function to be called after ModalDialog is closed
function onCloseNewContact(dialogResult, returnValue)
{
    if(dialogResult == SP.UI.DialogResult.OK)
    {
        loadContactsList();    
    }
}

/// Event handler for Delete button
function onDelete()
{
    var ctx = SP.ClientContext.get_current();
    var web = ctx.get_web();
    var list = web.get_lists().getByTitle(LIST_NAME);

    var listItem = list.getItemById(selectedItemId);
    listItem.deleteObject();

    ctx.executeQueryAsync(
            Function.createDelegate(this, onDeleteSuccess),
            Function.createDelegate(this, onFail));
}

/// Function to be called after executeQueryAsync
/// in onDelete has been successful 
function onDeleteSuccess()
{
    SP.UI.Notify.addNotification("Contact deleted", false);
    $("#details").hide();
    loadContactsList();
}