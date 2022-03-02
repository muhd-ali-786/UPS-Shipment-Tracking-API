const upsAPI = require('ups-nodejs-sdk')


const ups = new upsAPI({
    environment:'sandbox',
    username: process.env.UPS_USERNAME,
    password: process.env.UPS_PASSWORD,
    access_key: process.env.UPS_ACCESS_KEY,
    imperial: true
})

var res_data = [];

const trck = (current_i,trk_no_list,res)=>{

    

        if(current_i<trk_no_list.length){

            if(trk_no_list[current_i]!='\r'){

                ups.track(trk_no_list[current_i],{latest:true}, (err, result)=>{

                let ghi;
                if (err){
                    // res.send(err.ErrorDescription)
                    //    res_data.push({
                    //        status :'error',
                    //        content:err.ErrorDescription
                    //    })
                    ghi={
                            cur_trk_no:trk_no_list[current_i],
                            status :'error',
                            content:{
                                status: err.ErrorDescription,
                                address: 'Not Available',
                                delivDate: 'Not Available'
                            }
                            
                        }
                    // console.log(ghi)

                }
                else{
                   let {City, StateProvinceCode,PostalCode, CountryCode } = result.Shipment.ShipTo.Address

                   
                    ghi = {
                        cur_trk_no:trk_no_list[current_i],
                       

                        status :'success',
                        content: {
                            status: result.Shipment.Package.Activity.Status.StatusType.Description,
                            address: `${PostalCode}, ${City}, ${StateProvinceCode}, ${CountryCode}.`,
                            delivDate: result.Shipment.ScheduledDeliveryDate ==null ? (result.Shipment.Package.RescheduledDeliveryDate== null ? 'Not Available':result.Shipment.Package.RescheduledDeliveryDate ):result.Shipment.ScheduledDeliveryDate
                        }
                    }
                    
                }
                    res_data.push(ghi)


                 trck(current_i+1,trk_no_list,res)
            
                })
            }
            else{
                 trck(current_i+1,trk_no_list,res)
            }
            
        }
        else{
            console.log('hellos')
            // res.send(res_data)
            res.render('result',{rs:res_data})
        }
    
    

   
}



const track_activity = async (req, res)=>{

    // res.setHeader('Content-Type', 'application/json')
    let trk_no = req.body.trk_list
    console.log(trk_no)
    trk_no = trk_no.trim().split('\n')
    // console.log(lt.length)
    
    res_data = [];

    trck(0, trk_no, res)

      
    //    ups.track(trk_no,{latest:true}, (err, result)=>{

    //     let ghi;
    //     if (err){
    //         // res.send(err.ErrorDescription)
    //         //    res_data.push({
    //         //        status :'error',
    //         //        content:err.ErrorDescription
    //         //    })
    //         ghi={
    //                 status :'error',
    //                 content:err.ErrorDescription
    //             }
            

    //     }
    //     else{
            
    //         ghi = {
    //             status :'success',
    //             content: result.Shipment.Package.Activity.Status.StatusType.Description
    //         }
            
    //     }
        

    //     console.log(ghi)
    //     res.render('result',{rs:ghi})

    // })
    // console.log(abc)
    // 
    // console.log(res_data)
    // res.send(JSON.stringify(res_data))
   
        // console.log(lt[i])
         
            
    
    
    

}

const track_test = (req, res) =>{
    
    res.set('Content-Type','text/plain')

    let  tr_id = req.params.track_id
    // console.log(tr_id)

    ups.track(tr_id,{latest:true},(err, result)=>{
        if (err){
            res.send(err.ErrorDescription)
        }
        // res.send(result.Shipment.Package.Activity.Status.StatusType.Description)
        console.log(result )
    })
}


module.exports={
    track_activity,
    track_test
}