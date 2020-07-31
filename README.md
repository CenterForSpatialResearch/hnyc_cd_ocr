

# HNYC City Directory OCR Process using Tesseract v5 
> From image preprocessing to generating corresponding text files to each scanned city directory image from Manhattan and Brooklyn 

This work encompasses the use of Tesseract for Optical Character Recognition (OCR) process over historical City Directories (CD) from Manhattan and Brooklyn. 


### Initial Configuration

This project requires the links to Manhattan CD's scraped from the NYPL website's API, and also the individual pages from Brooklyn CD PDFs.

## Developing

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone https://github.com/CenterForSpatialResearch/hnyc_cd_ocr/
cd hnyc_cd_ocr/
npm install -g nypl-spacetime/hocr-detect-columns
```

To succesfully have this project work in your system, you would require the procedure to detecting columns (and wrapping lines) work in the system. For the process of detecting columns and wrapping lines into valid entries, we have used the HOCR format output of Tesseract and followed steps from NY Public Library's effort. More details regarding it ![here](http://spacetime.nypl.org/city-directory-meetup/#/), and code ![here](https://github.com/nypl-spacetime/hocr-detect-columns)



## Features

* To ensure no errors come up due to issues with the link, the program first checks that the link is valid and if so proceeds to access the image, using try except block over urllib command
* Cropping the image: This is an essential step that narrows down the image to what is necessary input. With lesser noisy input, Tesseract gives cleaner output. The process involves finding the 4 locations in the image that form the corners of the cropped image. (calculated as a percentage of current image size + pixel indexing starts from top left corner with (0,0)). Used PILLOW library’s image.crop command: image.crop((left, top, right, bottom))
* Correcting the orientation (rotating): Depending on the side the page appears in the book (right/left side page), the orientation had to be corrected. This might primarily be because of the cameras that were set up in place for either side of the CD book while capturing the pages. The orientation was same for all pages on a particular side of each book. (usually either 90 or 270). Command used: image.transpose(Image.ROTATE_90).
* Binary thresholding of the image: After having tried both global thresholding and ![local thresholding](https://scikit-image.org/docs/stable/auto_examples/segmentation/plot_niblack_sauvola.html#:~:text=Niblack%20and%20Sauvola%20thresholds%20are,for%20text%20recognition%201%2C%202.&text=Here%2C%20we%20binarize%20an%20image,a%20common%20global%20thresholding%20technique.) (particularly the Sauvola Thresholding), local thresholding seemed to give better results. It is said to work better for historical documents because of issues such as ink leakage, erosion, etc.


## Links

Even though this information can be found inside the project on machine-readable
format like in a .json file, it's good to include a summary of most useful
links to humans using your project. You can include links like:

- Project homepage: https://github.com/CenterForSpatialResearch
- Repository: https://github.com/CenterForSpatialResearch/hnyc_cd_ocr/

- Related projects:
  - NYPL project: https://github.com/nypl-spacetime/city-directories



<b> Folders in this repository: </b> <br>
- Scraping folder contains JavaScript code for scraping TIF image links from NYPL for all years surrounding 1850, 1880 and 1910.
- Excel sheet with the names of the 10 years whose data is being taken from [digitized New York City directories](https://digitalcollections.nypl.org/search/index?utf8=%E2%9C%93&keywords=city+directory).
