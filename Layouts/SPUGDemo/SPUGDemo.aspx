<%@ Assembly Name="$SharePoint.Project.AssemblyFullName$" %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SPUGDemo.aspx.cs" Inherits="SPUGDemo.Layouts.SPUGDemo.SPUGDemo" DynamicMasterPageFile="~masterurl/default.master" %>

<asp:Content ID="PageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink ID="ScriptLink1" runat="server" Language="javascript" Name="SP.js" Localizable="false" OnDemand="false" LoadAfterUI="true" />
    <SharePoint:ScriptLink ID="ScriptLink2" runat="server" Language="javascript" Name="jquery-1.6.2.min.js" Localizable="false" OnDemand="false" />
    <SharePoint:ScriptLink ID="ScriptLink3" runat="server" Language="javascript" Name="SPUGDemo/SPUGDemo.js" Localizable="false" OnDemand="false" />

    <style type="text/css">
        #header
        {
            display: block;
            font-size:x-large;
        }
       
        #column1,
        #column2
        {
            float:left;
            margin: 5px;
        }
        
        #column2 span
        { 
            font-size:x-large;
        }
        
        #contactList
        {
            margin: 5px;
            overflow:scroll;
            height: 300px;
            width: 225px;
            border: 1px solid #333333;
        }
        
        #contactList span
        {
            cursor: pointer;
            font-size: large;
        }
        
        #contactList span:hover
        {
            color:Blue;
        }        
    </style>
</asp:Content>

<asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">
<div>
    <span id="header">Contacts</span>
    <div id="column1">        
        <div id="contactList"></div>
        <div>
            <input id="newContact" type="button" value="Add Contact" onclick="onNewContact()" />
        </div>
    </div>
    <div id="column2">
        <div id="details">
            <span id="FirstName" class="field"></span>
            <span id="Title" class="field"></span>
            <div>
                <span id="WorkAddress" class="field"></span>
            </div>
            <div>
                <span id="WorkCity" class="field"></span>, <span id="WorkState" class="field"></span> <span id="WorkZip" class="field"></span>
            </div>
            <div>
                <input id="edit" type="button" value="Edit" onclick="onEdit()" />
                <input id="delete" type="button" value="Delete" onclick="onDelete()" />
            </div>
        </div>
    </div>

</div>
</asp:Content>

<asp:Content ID="PageTitle" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
Client Object Model Demo Page
</asp:Content>

<asp:Content ID="PageTitleInTitleArea" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server" >
Client Object Model Demo Page
</asp:Content>
