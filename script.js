/* make ajax reques
/* 1)xml hhtp reques */
/* 2)fetch */

/* 1 xml hhtp requist */
// renderis lgika tu sworad mivwvdit servers 
// function getUsers(){
//     function renderPage(){
//         let resnponse=this.responseText;
//         let responsData= JSON.parse(resnponse);
//         console.log(responsData);

//         let ul = document.createElement('ul');

//         // responsData.data.forEach(element => {
//         //     let li = document.createElement('li');
//         //     li.textContent = `${element.first_name} ${element.last_name}`;
//         //     ul.appendChild(li);
//         // });
//         let li=document.createElement('li');
//         li.textContent=responsData.data[3].email;
//         ul.appendChild(li);
//         document.getElementById('api').appendChild(ul);
//     }
// // renderis logika tu arasworad mviedit
//     function errorrender(){
//         let p=document.createElement('p');
//         p.textContent='Server Error';
//         p.style.color='red';
//         document.getElementById('api').appendChild(p);
//     }

//     let requist = new XMLHttpRequest();
//     requist.open('GET', 'https://reqres.in/api/users?page=2');
//     requist.addEventListener('load', renderPage);
//     requist.addEventListener('error', errorrender);
//     requist.send();
// }

// getUsers();


// fetch
let currentPage=1;
let totalPage;
function GetuserAjax(page) {
    fetch ('https://reqres.in/api/users?page=' + page, {
        method:'GET',
        })
        .then(function(resnponse){
            if(resnponse.status !== 200){
                throw Response.status;
            }
            return resnponse.json();
        })
        .then(function(responsData){
            
            // let li=document.createElement('li');
            // li.textContent=responsData.data[3].email;
            // ul.appendChild(li);
            // document.getElementById('api').appendChild(ul);
            const fragment = document.createDocumentFragment();
    
            responsData.data.forEach(element => {
                let li = document.createElement('li');
                let p = document.createElement('p');
                p.textContent = `${element.first_name} ${element.last_name}`;
                fragment.appendChild(li);
                let image=document.createElement('img');
                image.src=element.avatar;
                li.appendChild(image);
                li.appendChild(p);
            });
            document.getElementById('list').innerHTML=" ";
            document.getElementById('list').appendChild(fragment);
            totalPage=responsData.total_pages;
        })
        .catch(function(error){
            if (error==404){
                let p=document.createElement('p');
                p.textContent='Page was not found';
                p.style.color='red';
                document.getElementById('api').appendChild(p);
            } 
            else{
                let p=document.createElement('p');
                p.textContent='Server Error';
                p.style.color='red';
                document.getElementById('api').appendChild(p)
            };
            
        })
      document.getElementById('loadprev').addEventListener('click', function(){
        if(currentPage==1){
            return;
        }
        currentPage-=1;
        GetuserAjax(currentPage);
        
      })
      document.getElementById('loadnext').addEventListener('click', function(){
        if (currentPage==totalPage) {
            return;
        }
        currentPage+=1;
        GetuserAjax(currentPage);
      })
          
}
document.getElementById('loadmore').addEventListener('click', function (){
    // currentPage++;
    // currentPage=currentPage + 1;
    currentPage += 1;
    GetuserAjax(currentPage);

})
GetuserAjax(currentPage);


