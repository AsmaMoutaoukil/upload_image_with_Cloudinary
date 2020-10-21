import React, { Component } from 'react';

class UploadImage extends Component {
    state = {
    
        profile_picture: ""
    
      }
    
    handleUploadFile = (event) => {
      
      const files=event.target.files
         if (!files) return;
          const fileArray = [];
          const fileObj = [];
          const data = new FormData() 
          fileObj.push(files)

          //voir l'image avant upload
            for (let i = 0; i < fileObj[0].length; i++) {
              fileArray.push(URL.createObjectURL(fileObj[0][i]))
            }

          for(let x = 0; x <files.length; x++) {
            data.append('file', files[x])
          }
       
        const config = { headers: { 'content-type': 'multipart/form-data' } }
        axios.post(`http://localhost:3000/upload_image`, data, config)
        . then((response) => {

          this.setState({
            profile_picture: response.data //ou fileArray 
          })
          console.log(this.state.profile_picture)
        })
      }
    
    render() {
        return (
            <div className="input-uplad-wrapper">
            <button className="btn-upload">Upload</button>
            <input accept=".jpg, .jpeg, .png, .gif" name="file" type="file" onChange={this.handleUploadFile} multiple  />
          </div>
        );
    }
    }
    


export default UploadImage;