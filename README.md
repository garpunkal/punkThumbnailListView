# punkThumbnailListView

[![NuGet release](https://img.shields.io/nuget/v/punkThumbnailListView.svg)](https://www.nuget.org/packages/punkThumbnailListView/)

A dynamic ListView for Umbraco that allows you automatically show images and nodes: 

- An Umbraco image using the following listview header name: 

    - thumbnail
    - image
    - logo
    - listingimage
    - mainimage
    - heroimage

- An External image using the following listview header name: 

    - externalthumbnail
    - externalimage
    - externallogo
    - externallistingimage
    - externalmainimage
    - externalheroimage

- Related Umbraco document(s) node name.

It works with all the original functionality of ListView, including selections, sort and search. 

## Usage 

Just create a new listview in Umbraco, add your custom fields and specify using the listview name as above. Use this path for the view within the listview

`/app_plugins/punkThumbnailListView/punkthumbnailListView.html`

It should display your images and titles within the listview. 

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
Copyright © 2023 Gareth Wright, and other contributors.

Licensed under the MIT License.