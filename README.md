# Thumbnail List View

[![.github/workflows/release.yml](https://github.com/garpunkal/punkThumbnailListView/actions/workflows/release.yml/badge.svg)](https://github.com/garpunkal/punkThumbnailListView/actions/workflows/release.yml)

An app_plugin for Umbraco that allows you to view a ListView with the following extras:

- A image with the field alias: (thumbnail, image, logo, listingImage) 
- A name field from a linked document.

It works with all the original functionality of ListView, including selections, sort and search. 

## Usage 

Just create a new listview in Umbraco, add your custom fields for imagery or linked relations. 
then use this path for a view: 

`/app_plugins/punkThumbnailListView/punkthumbnailListView.html`

It should display your images and relational titles in the listview. 

## Nuget

`Install-Package punkThumbnailListView`

https://www.nuget.org/packages/punkThumbnailListView/

## Compatibility

- Umbraco 10+ 
## Screenshots
  
### ListView
![Screenshot](https://raw.github.com/garpunkal/punkThumbnailListView/main/listview.jpg)

### DataType
![DataType setup](https://raw.github.com/garpunkal/punkThumbnailListView/main/datatype.jpg)
