# Umbraco Thumbnail List View

An app_plugin for Umbraco that allows you to view a ListView with the following extras:

- A image with the field alias: thumbnail|image|logo|listingImage
- A title field from a linked document, e.g. article type

It works with all the original functionality of ListView, including selections, sort and search. 

# Usage 

Just create a new listview in Umbraco, add your custom fields for imagery or linked relations. 

then use this path for a view: /app_plugins/punkThumbnailListView/punkthumbnailListView.html. 

It should display your images and relational titles in the listview. 

# Nuget

`Install-Package punkThumbnailListView`

https://www.nuget.org/packages/punkThumbnailListView/

# Compatibility

- Umbraco 9+ through nuget package but files should work on older version of Umbraco. 
