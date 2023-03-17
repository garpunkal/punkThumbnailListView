# punkThumbnailListView

[![NuGet release](https://img.shields.io/nuget/v/punkThumbnailListView.svg)](https://www.nuget.org/packages/punkThumbnailListView/)

A ListView for Umbraco that allows you include extras: 

- A image with the field header using the following name: thumbnail|image|logo|listingimage|mainimage|heroimage.

- An external image with the field header using the following name: externalthumbnail|externalimage|externallogo|externallistingimage|externalmainimage|externalheroimage

- A name field from a linked document(s).

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

- Umbraco 10.4+

## Screenshots
  
### ListView
![Screenshot](https://raw.github.com/garpunkal/punkThumbnailListView/main/listview.jpg)

### DataType
![DataType setup](https://raw.github.com/garpunkal/punkThumbnailListView/main/datatype.jpg)

# Contact
This project is maintained by Gareth Wright and contributors. If you have a question or issue, please get in touch on [Twitter](https://twitter.com/garpunkal), or by raising an issue on GitHub.

## License
Copyright © 2023 Gareth Wright, and other contributors
Licensed under the MIT License.