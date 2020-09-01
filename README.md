# poc-webm-to-mp4
Basic poc webm to mp4 convert Node JS

#### FFMPEG MUST BE INSTALLED 

https://ffmpeg.org/

### Usage example

```
POST /convert HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: 00b03757-5f5c-d73b-2fc6-fe0b9ded3691
{
	"fileUrl": "https://inboldblob.blob.core.windows.net/gstudent/1598490572_RecordedVideo.webm"
}
```


