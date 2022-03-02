

// let inp_box=document.querySelector('#inp');
// let trk_form=document.querySelector('#trk_form');

// trk_form.addEventListener('submit',(e)=>{

//     // e.preventDefault()
    
//     let raw_data = inp_box.value
//     // console.log(raw_data)
//     let lt = raw_data.split('\n')
//     // for(let trk of lt){
//     let xmlhttp = new XMLHttpRequest()

//     xmlhttp.open("POST",'/track/act',true)

//     xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

//     xmlhttp.onreadystatechange = ()=>{
//         if (this.readyState == 4 && this.status ==200){
                
//             // try{
//                 // let res_data = JSON.parse(this.responseText);
//                 // console.log(res_data)
//                 window.location('/result')
//             // }
//             // catch(err){
//             //     alert(err.message);
//             //     location.reload()
//             // }
//         }
//     }

//     xmlhttp.send('data_track_id='+lt[0])
    
//     // }

// })