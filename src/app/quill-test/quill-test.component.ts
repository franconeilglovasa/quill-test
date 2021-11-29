import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CompressImageService } from './compress-image.service';
//import { Op, QuillVM } from './quilvm';

import * as QuillNamespace from 'quill';
let Quill: any = QuillNamespace;
import ImageResize from 'quill-image-resize-module';
import { ImageService } from './url-image.service';
import { Op, QuillTypesVM } from './quill-vm';
Quill.register('modules/imageResize', ImageResize);

@Component({
  selector: 'app-quill-test',
  templateUrl: './quill-test.component.html',
  styleUrls: ['./quill-test.component.scss']
})
export class QuillTestComponent implements OnInit {

  @ViewChild('imgRenderer') imgRenderer: ElementRef;



  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
      [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'], // remove formatting button
      ['link', 'image'], // link and image, video
    ],
    imageResize: true, // for image resize
  };
  jsonString: string = " ";
  jsonStringCompressed : string = '';
  quillEditorRef: any;

  jsonDataFile;


  baseStrings: string[] = [];
  base64Image: string;

  constructor(public imageService: ImageService) { }

  ngOnInit(): void {
  }

  onSelectionChanged = (event) => {

   }
  onContentChanged = (event) => {
    //console.log ("event",event);
    let jsonData = JSON.stringify(event.content);
    //console.log (jsonData);
    //this.pasteImageAndCompress(jsonData);
  }
  editorCreated(quill: any) { }

  // quillclick() {
  //   //console.log (this.jsonString);
  //   let data = JSON.parse(this.jsonString);

  //   //console.log(data);
  //   //let baseStrings: string[] = [];
  //   this.baseStrings = [];

  //   if (data.ops.length > 1) {
  //     for (let ctr = 0; ctr < data.ops.length; ctr++) {
  //       if (data.ops[ctr].insert.image) {
  //         console.log("has image in " + ctr);
  //         console.log(data.ops[ctr].insert.image);
  //         let dataimage = data.ops[ctr].insert.image.split(",");

  //         //data.ops[ctr].insert.image = "BASE 64 replaced image with address location here";
  //         //console.log("before ", data.ops[ctr].insert.image.length);
  //         console.log("before ", this.calc_image_size(data.ops[ctr].insert.image));
  //         let compressedImage = this.compressImage(dataimage);
  //         //console.log ("compressed Image", compressedImage);
  //         //console.log("after", compressedImage.length);
  //         console.log("after  ", this.calc_image_size(compressedImage));
  //         if (dataimage[1]) {
  //           //console.log ("base 64 image");
  //           let image64string: string = dataimage[1];
  //           console.log("base image" + ctr);
  //           //this.baseStrings.push(image64string);

  //         } else {
  //           console.log("url image" + ctr);
  //           let urltobase64Raw;
  //           let hrefloc = data.ops[ctr].insert.image;
  //           data.ops[ctr].insert.image = "HTML LINK: replaced image with address location here";
  //           if (hrefloc.includes("http")) {
  //             var ddata = this.imageToBase(hrefloc, function (imageToBase, anothercall) {
  //               //console.log("Else url to Base64", imageToBase);
  //               urltobase64Raw = imageToBase;
  //               this.baseStrings.push(urltobase64Raw);
  //               return anothercall(urltobase64Raw);
  //               //console.log ("url to Base64", urltobase64Raw);
  //               // let dataimagelse = urltobase64Raw.split(",");
  //               // if (dataimagelse[1]) {
  //               //   //console.log ("else base 64 image");
  //               //   let image64string: string = dataimagelse[1];
  //               //   //console.log("Base 64 Image", image64string);
  //               // }
  //             });
  //             console.log(ddata);
  //           }

  //         }

  //       }
  //     }
  //   }
  //   console.log(this.baseStrings);
  //   console.log(data.ops);
  // }


  // quillclickURL(jsonstring: string) {

  //   let data: QuillVM = JSON.parse(jsonstring);
  //   //console.log(data);

  //   if (data.ops.length > 1) {
  //     for (let ctr = 0; ctr < data.ops.length; ctr++) {
  //       if (data.ops[ctr].insert.image) {

  //         console.log("url image");
  //         let urltobase64Raw;
  //         let hrefloc = data.ops[ctr].insert.image;

  //         //data.ops[ctr].insert.image = "HTML LINK: replaced image with address location here";
  //         console.log(hrefloc);
  //         if (hrefloc.includes("http")) {
  //           this.getImageFromUrl(hrefloc);
  //         }
  //       }
  //     }
  //   }
  //   //console.log(data.ops);
  //   console.log(this.baseStrings);
  // }

  // urlAndLocalClick(jsonstring: string) {
  //   this.baseStrings = [];

  //   let data: QuillVM = JSON.parse(jsonstring);
  //   //process the url here
  //   if (data.ops.length > 1) {
  //     for (let ctr = 0; ctr < data.ops.length; ctr++) {
  //       if (data.ops[ctr].insert.image) {

  //         console.log("url image");
  //         let hrefloc = data.ops[ctr].insert.image;

  //         console.log(hrefloc);
  //         if (hrefloc.includes("http")) {
  //           this.getImageFromUrl(hrefloc);
  //         }
  //       }
  //     }
  //   }

  //   this.baseStrings = [];

  //   if (data.ops.length > 1) {
  //     for (let ctr = 0; ctr < data.ops.length; ctr++) {
  //       if (data.ops[ctr].insert.image) {

  //         let dataimage = data.ops[ctr].insert.image.split(",");

  //         let compressedImage = this.compressImage(dataimage);
  //         console.log("compressed image", compressedImage);

  //         if (dataimage[1]) {
  //           let image64string: string = dataimage[1];
  //           this.baseStrings.push(image64string);

  //         }
  //       }
  //     }
  //   }

  //   console.log(this.baseStrings);
  // }



  // imageToBase(url: string, callback) {
  //   //let urlTest = "https://pbs.twimg.com/profile_images/558329813782376448/H2cb-84q_400x400.jpeg";

  //   var xhr = new XMLHttpRequest();
  //   xhr.onload = function () {
  //     var reader = new FileReader();
  //     reader.onloadend = function () {
  //       callback(reader.result);
  //     }
  //     reader.readAsDataURL(xhr.response);
  //   };
  //   xhr.open('GET', url);
  //   xhr.responseType = 'blob';
  //   xhr.send();
  //   //console.log (callback);
  // }

  compressImage(base64Str, MAX_WIDTH = 450, MAX_HEIGHT = 450) {
    let img = new Image();
    img.src = base64Str
    let canvas = document.createElement('canvas')
    let width = img.width
    let height = img.height

    if (width > height) {
      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width
        width = MAX_WIDTH
      }
    } else {
      if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height
        height = MAX_HEIGHT
      }
    }
    canvas.width = width
    canvas.height = height
    let ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, width, height)
    var newString = canvas.toDataURL()
    return newString;
  }

  calc_image_size(image) {
    let y = 1;
    if (image.endsWith("==")) {
      y = 2
    }
    const x_size = (image.length * (3 / 4)) - y
    return Math.round(x_size / 1024)
  }

  getImageFromUrl(url: string) {
    console.log(url);

    var ext = url.split('.').pop();
    console.log(ext);
    this.imageService.imageUrlToBase64(url).subscribe(
      base64 => {
        //this.base64Image ="data:image/"+ ext +";base64,"+ base64;
        //console.log (this.base64Image);
        //this.baseStrings.push(this.base64Image);

        //console.log("before ", this.calc_image_size(this.base64Image));
        //let compressedImage = this.compressImage(base64);
        //console.log("after  ", this.calc_image_size(compressedImage));
        this.baseStrings.push(base64);
      });
  }

  ImageCompress(data : QuillTypesVM ) {

    //let data: QuillTypesVM = JSON.parse(jsonstring);
    //let data: QuillTypesVM = jsonData;
    let jsonTemp: QuillTypesVM = new QuillTypesVM();

    console.log ("data", data);

    let ops: Op[] = [];
    //console.log (ops);

    if (data.ops.length > 0) {
      for (let ctr = 0; ctr < data.ops.length; ctr++) {

        //if data has image
        if (data.ops[ctr].insert.image) {
          let dataimage = data.ops[ctr].insert.image.split(",");
          let compressedImage;
          //if picture (not from url)
          if (dataimage[1]) {
            //get the size and compress if the size is greater than 400kb
            const size = this.calc_image_size(data.ops[ctr].insert.image)
            if (size > 400) {
              compressedImage = this.compressImage(data.ops[ctr].insert.image);
            } else {
              compressedImage = data.ops[ctr].insert.image;
            }
            data.ops[ctr].insert.image = compressedImage;
          }
        }

        //storetoJsonTemp
        ops.push(data.ops[ctr]);
      }
      jsonTemp.ops = ops;
      this.jsonString = JSON.stringify(jsonTemp);
    } else {
      //not enough object return the same json string
      this.jsonString = JSON.stringify(data);
    }
 

  }

  cChange(event) {
    let jsonData = JSON.stringify(event.content);
  //   console.log ( jsonData);

    console.log ("event content",event.content);
    let jsonTemp: QuillTypesVM = new QuillTypesVM();
    let ops : Op [] = [];
    for (var ctr=0; ctr<event.content.ops.length; ctr++) {
      ops.push(event.content.ops[ctr]);
      //console.log(event.content.ops[ctr]);
    }
    //console.log (ops);
    jsonTemp.ops = ops;

    //this.jsonString = JSON.stringify(jsonTemp);
    console.log (jsonTemp);
    this.ImageCompress(jsonTemp);
  }



}
