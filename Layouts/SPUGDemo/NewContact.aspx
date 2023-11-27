<%@ Assembly Name="$SharePoint.Project.AssemblyFullName$" %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="NewContact.aspx.cs" Inherits="SPUGDemo.Layouts.SPUGDemo.NewContact" DynamicMasterPageFile="~masterurl/default.master" %>

<asp:Content ID="PageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink ID="ScriptLink1" runat="server" Language="javascript" Name="SP.js" Localizable="false" OnDemand="false" LoadAfterUI="true" />
    <SharePoint:ScriptLink ID="ScriptLink2" runat="server" Language="javascript" Name="jquery-1.6.2.min.js" Localizable="false" OnDemand="false" />
    <SharePoint:ScriptLink ID="ScriptLink3" runat="server" Language="javascript" Name="SPUGDemo/NewContact.js" Localizable="false" OnDemand="false" />
</asp:Content>

<asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <div id="newContact">
        <span>First Name:</span><input type="text" id="FirstName" class="field" />
        <span>Last Name:</span><input type="text" id="Title" class="field" />
        <div>
            <span>Address:</span><input type="text" id="WorkAddress" class="field" />
        </div>
        <div>
            <span>City:</span><input type="text" id="WorkCity" class="field" />
            <span>State:</span><input type="text" id="WorkState" class="field" style="width:3em" />
            <span>Postal Code:</span><input type="text" id="WorkZip" class="field" style="width:6em" />
        </div>
    </div>
    <div style="margin-top:10px; float:right">
        <input id="add" type="button" value="Add Contact" onclick="onAdd()" />
        <input id="cancel" type="button" value="Cancel" onclick="onCancel()" />
    </div>
</asp:Content>

<asp:Content ID="PageTitle" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
New Contact
</asp:Content>

