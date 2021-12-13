const url="http://localhost/backend/api?q=";

//function call from input
function showResult(text)
{
    if(text.trim().length > 1)
    {
        document.getElementById('results').innerHTML = ""
        fetchApi(text)
        .then((data) => {
            if(data[0].total > 0)
            {
                let fetch = data[0].data
                let boardStyle =""
                let sideStyle=""
                
                if (fetch.length <=3){
                    boardStyle='style="max-height:200px !important"'
                    sideStyle='style="height:200px !important"'
                }
                let html ="";
                    html+='<div class="board" '+boardStyle+'>'+
                            '<div class="side" '+sideStyle+'>'+
                            '<span class="head-text">Online Shops</span>'+
                            '<ul class="head-text-ul">'

                                for(let i=0;i<fetch.length;i++)
                                {
                                    html+='<li><a href="'+fetch[i].p_url+'">'+bolden(fetch[i].p_name,text)+'</a></li>'
                                }

                    html+='</ul>'+
                            '<a href="#" class="btn info base-btn">Alle Ergebnisse</a>'+
                            '</div>'+
                            '<div class=boxes>'
                            
                            for(let j=0;j<fetch.length;j++)
                            {
                                html+='<div class="box">'+
                                '<a href="'+fetch[j].p_url+'"></a>'+
                                    '<div class="img-div">'+
                                    '<img src="'+fetch[j].p_img_src+'" alt="'+fetch[j].p_name+'" title="'+fetch[j].p_name+'"/>'+
                                    '</div>'+
                                    '<div class="desc-div">'+
                                    '<div class="desc">'+fetch[j].p_name+'</div>'+
                                    '<div class="incentive"><b>'+fetch[j].p_incentive+'</b></div>'+
                                    '</div>'+
                                '</div>'
                            }
                          
                            html+='</div>'+
                        '</div>'
                        
                        document.getElementById("results").style.visibility = "visible";
                        document.getElementById('results').innerHTML = html

            }
            else{
                document.getElementById('results').innerHTML = ""
                document.getElementById("results").style.visibility = "hidden";
            }
          
        })
        .catch((err) => {
            document.getElementById('results').innerHTML = ""
            document.getElementById("results").style.visibility = "hidden";
            console.log("rejected", err.message);
          });
    }
    else{
        document.getElementById('results').innerHTML = ""
        document.getElementById("results").style.visibility = "hidden";
    }
}

//asynchronous function call to get data from API
const fetchApi = async (searchQuery) => {
    let response = await fetch(url+encodeURIComponent(searchQuery));
    let data = response;
    return data.json();
};

//function to bolden searched characters in result
function bolden(result, query) {
    var re = new RegExp(query.split("").map(function(x) { 
        return x.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); 
    }).join("[-\\s.]*"), 'ig');
    return result.replace(re, '<b>$&</b>');
}
