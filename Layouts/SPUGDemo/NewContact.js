var LIST_NAME = 'SPUG Demo Contacts';

$(document).ready(function ()
{
});

/// Add Contact button event handler
function onAdd()
{
    var ctx = SP.ClientContext.get_current();
    var web = ctx.get_web();
    var list = web.get_lists().getByTitle(LIST_NAME);

    // can be null when adding item to root folder
    var createInfo = null;
    //var createInfo = new SP.ListItemCreationInformation();
    var item = list.addItem(createInfo);

    $(".field").each(function ()
    {
        var id = $(this).attr("ID");
        var value = $(this).val();

        item.set_item(id, value);
    });

    item.update();

    ctx.executeQueryAsync(
            Function.createDelegate(this, onAddContactSuccess),
            Function.createDelegate(this, onFail));
}

/// Cancel button event handler
function onCancel()
{
    SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.cancel, 'Cancel');
}

/// Function to be called after executeQueryAsync
/// in onAdd has been successful 
function onAddContactSuccess(sender, args)
{
    SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.OK, 'OK');
}

/// Function to notify of any failure for executeQueryAsync
function onFail(sender, args)
{
    alert(args.get_message());
}