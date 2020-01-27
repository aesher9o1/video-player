# Video Player

> Video.js integration on react paired with Quill as text editor to allow bookmarks while watching a *tutorial*/any other implementaion as you may please. Brewed with 🧡



## 1. Installation 🦉
```bash
sudo add-apt-repository ppa:mc3man/trusty-media  
sudo apt-get update  
sudo apt-get install -y ffmpeg bc
```
### Generating TS file 
1. Use the below command to generate *360 480 720 and 1080p* varients of the video.

```bash
ffmpeg -hide_banner -y -i beach.mkv \
  -vf scale=w=640:h=360:force_original_aspect_ratio=decrease -c:a aac -ar 48000 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -hls_time 4 -hls_playlist_type vod  -b:v 800k -maxrate 856k -bufsize 1200k -b:a 96k -hls_segment_filename beach/360p_%03d.ts beach/360p.m3u8 \
  -vf scale=w=842:h=480:force_original_aspect_ratio=decrease -c:a aac -ar 48000 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -hls_time 4 -hls_playlist_type vod -b:v 1400k -maxrate 1498k -bufsize 2100k -b:a 128k -hls_segment_filename beach/480p_%03d.ts beach/480p.m3u8 \
  -vf scale=w=1280:h=720:force_original_aspect_ratio=decrease -c:a aac -ar 48000 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -hls_time 4 -hls_playlist_type vod -b:v 2800k -maxrate 2996k -bufsize 4200k -b:a 128k -hls_segment_filename beach/720p_%03d.ts beach/720p.m3u8 \
  -vf scale=w=1920:h=1080:force_original_aspect_ratio=decrease -c:a aac -ar 48000 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -hls_time 4 -hls_playlist_type vod -b:v 5000k -maxrate 5350k -bufsize 7500k -b:a 192k -hls_segment_filename beach/1080p_%03d.ts beach/1080p.m3u8
```
2. Once the files are rendered generate a master.m3u8 file. You could use the following template
```m3u8
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360
360p.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=1400000,RESOLUTION=842x480
480p.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=2800000,RESOLUTION=1280x720
720p.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=5000000,RESOLUTION=1920x1080
1080p.m3u8
```

Alternatively run `./combine.sh SOURCE_FILE [OUTPUT_NAME]` to let the code do the magic🌈🌈.

## 2. Explaination 👩‍⚖️
* `-i beach.mkv` - set *beach.mkv* as input file
* `-vf "scale=w=1280:h=720:force_original_aspect_ratio=decrease"` - scale video to maximum possible within 1280x720 while preserving aspect ratio
* `-c:a aac -ar 48000 -b:a 128k` - set audio codec to AAC with sampling of 48kHz and bitrate of 128k
* `-c:v h264` - set video codec to be H264 which is the standard codec of HLS segments
* `-profile:v main` - set H264 profile to main - this means support in modern devices
* `-crf 20` - Constant Rate Factor, high level factor for overall quality
* `-g 48 -keyint_min 48` - IMPORTANT create key frame (I-frame) every 48 frames (~2 seconds) - will later affect correct slicing of segments and alignment of renditions
* `-sc_threshold 0` - don't create key frames on scene change - only according to -g
* `-b:v 2500k -maxrate 2675k -bufsize 3750k` - limit video bitrate, these are rendition specific and depends on your content type
* `-hls_time 4` - segment target duration in seconds - the actual length is constrained by key frames
* `-hls_playlist_type vod` - adds the #EXT-X-PLAYLIST-TYPE:VOD tag and keeps all segments in the playlist
* `-hls_segment_filename beach/720p_%03d.ts` - explicitly define segments files names
beach/720p.m3u8 - path of the playlist file - also tells ffmpeg to output HLS (.m3u8)

## 3. Heads Up 🙆🏼‍♂️
*  Hosting files on GCloud? You might want to change some values in **master.m3u8*file. The playlist file's location should should look like this 
**<gcloud_bucket_url>/playlist_file.m3u8/?token=<token>**. Do this will every other file in the individual playlist.
* Cannot run the shell script? Make sure you install all the dependencies. Errr same for the react project.

**Made possible beause of [peer5](https://docs.peer5.com/guides/production-ready-hls-vod/) [videojs](http://videojs.com/)❤️❤️**
