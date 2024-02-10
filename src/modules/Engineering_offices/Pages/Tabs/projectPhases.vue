<template>
  <!--قبول طلبات بدء الاعمال-->
  <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg bg-transparent">
    <div class="modal-content bg-transparent w-100">
      <div class="work_details bg-transparent">
        <div v-if="payments.length == 0" class="no-data text-center bg-white mt-5">
          <span class="text-danger fs-4" style="font-weight: 700;">لاوجد طلبات لهذه المرحلة</span>
        </div>
        <div class="payment"  v-for="payment , index in payments" :key="index">
           <div class="row px-3 justify-content-center">
           <div class="col-xl-6 col-lg-6 col-sm-12 col-12 d-block">
            <h2 class="text-center text-white py-3">صورة الفاتورة</h2>
            <span class="w-100">
              <img class="w-100" :src="payment.platform_receipt.url" alt="">
            </span> 
           </div>
           <div class="col-xl-6 col-lg-6 col-sm-12 col-12 d-block">
            <h2 class="text-center text-white py-3">صورة العقد</h2>
            <span class="w-100">
              <img class="w-100" :src="payment.receipt.url" alt="">
            </span> 
           </div>
           </div>
           <div class="row">
            <div class="col-12 pe-5 mt-5">
                  <h2 style="font-weight: 700;font-style: italic;color: beige;">الوصف...</h2>
            </div>
            <div class="col-12 pe-5 text-white">
                   <p style="font-size: 30px;">{{ payment.notes }}</p>
            </div>
           </div>
           <div class="row py-5 justify-content-center">
            
          <div class="col-xl-5 text-start col-lg-5 btn col-sm-4 col-12" style="border: none;">
            <div
            id="accept"
             @click="acceptOrRejectWork.officeAcceptOrRejectWork(`${api}office/contracts/approve_start` , payment)" 
             class="btn btn-success px-3 rounded-3">
            <span
            id="accept"
            class="px-3 py-2"
            @click="acceptOrRejectWork.officeAcceptOrRejectWork(`${api}office/contracts/approve_start` , payment)"
            v-if="acceptOrRejectWork.loading != 'accept'">قبول الطلب</span>
          </div>
        </div>  
          <div
          class="col-xl-5 text-end col-lg-5 btn col-sm-4 col-12 rej" style="border: none;">
            <div 
            id="reject"
            @click="acceptOrRejectWork.officeAcceptOrRejectWork(`${api}office/contracts/reject_start` , payment )" 
            class="btn btn-danger px-3 rounded-3">
              <span 
              id="reject"
              class="px-3 py-2"
              @click="acceptOrRejectWork.officeAcceptOrRejectWork(`${api}office/contracts/reject_start` , payment )" 
              v-if="acceptOrRejectWork.loading != 'reject'">رفض الطلب</span>
           
            </div>
           </div>
           <div class="col-12">
            <div v-if="acceptOrRejectWork.registerd" class="text-center w-100"><span class="fs-5 d-inline-block btn  rounded-3 text-white" style="font-weight: 500;margin-top: 10px;">{{ acceptOrRejectWork.registerd }}</span></div>
           </div>
           <div class="row justify-content-center">
            <atom-spinner v-if="acceptOrRejectWork.loading == true" :animation-duration="1000" :size="60" color="#ffff" />

          </div>  
          </div>
          
        </div>
      </div>
    </div>
  </div>
</div>
  <!--نهاية قبول طلبات بدء الاعمال-->
<!--تسليم مرحلة-->
<div id="editRequest" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
     <div class="w-100 d-block pt-3 text-center"><span style="color: #B18718;font-size: 24px;font:Cairo;font-weight: 700;">تسليم ومراجعة المرحلة الاولى</span></div>
     <div class="w-100 d-block text-center" style="overflow-x: hidden;">
      <svg width="1000" height="2" viewBox="0 0 754 2" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="1000" height="2" fill="#48847B"/>
</svg>
     </div>
     <div class="w-100 text-center"><span style="font-size: 16px;font:Cairo;font-weight: 700;color: #000000;">
      نأمل مراجعة المرفقات وفي حال وجود اي ملاحظات سنكون سعداء بتلبية طلبكم
     </span></div>
     <!--start files-->
     <div class="pt-3 ps-4 pe-4 form">
      <div class="rounded-2 w-100" style="border: 1px solid black;">
<div class="files pb-3">
<!--start files header-->
<div class="text-center two title-header">
            <div class="row justify-content-between align-items-baseline pt-3 pb-2">
                <div class="col-4 text-center title fs-5 mt-2 header_names first" style="font-weight: 700;">
                    إسم الملف
                </div>
                <div class="col-4 text-center title fs-5 mt-2 header_names" style="font-weight: 700;">
                    حجم الملف
                </div>
                <div class="col-4 text-center title fs-5 mt-2 header_names last" style="font-weight: 700;">
                    تاريخ الإضافة
                </div>
            </div>
           </div>
         
<!--end files header-->
<!--
<div v-if="sendFile.files.length == 0" class="text-center pb-5"><span class="fs-1 text-danger" style="font-weight: 700;">لا يوجد ملفات</span></div>
-->
<div v-if="startWork.payments == 0" class="text-center"><span class="fs-5 text-danger" style="font-weight:700">لم يتم اضافة ملفات</span></div>
<div class="payments" v-for="payment , index in startWork.payments" :key="index">
            <!--تأكيد استلام المرحلة-->
                <div  class="row justify-content-between align-items-baseline thirdCard mt-2">
                <div class="col-4 text-center">
                    <div class="content-text text-center">
                        <span class="ps-2">
                          <svg width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.625 17.25C5.625 16.9516 5.74353 16.6655 5.9545 16.4545C6.16548 16.2435 6.45163 16.125 6.75 16.125H17.25C17.5484 16.125 17.8345 16.2435 18.0455 16.4545C18.2565 16.6655 18.375 16.9516 18.375 17.25C18.375 17.5484 18.2565 17.8345 18.0455 18.0455C17.8345 18.2565 17.5484 18.375 17.25 18.375H6.75C6.45163 18.375 6.16548 18.2565 5.9545 18.0455C5.74353 17.8345 5.625 17.5484 5.625 17.25ZM5.625 21.75C5.625 21.4516 5.74353 21.1655 5.9545 20.9545C6.16548 20.7435 6.45163 20.625 6.75 20.625H17.25C17.5484 20.625 17.8345 20.7435 18.0455 20.9545C18.2565 21.1655 18.375 21.4516 18.375 21.75C18.375 22.0484 18.2565 22.3345 18.0455 22.5455C17.8345 22.7565 17.5484 22.875 17.25 22.875H6.75C6.45163 22.875 6.16548 22.7565 5.9545 22.5455C5.74353 22.3345 5.625 22.0484 5.625 21.75Z" fill="#B18718"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 3.75C0.75 2.097 2.097 0.75 3.75 0.75H13.785C14.628 0.75 15.423 1.107 15.9825 1.6965L15.9915 1.707L22.4595 8.76C22.998 9.3345 23.25 10.086 23.25 10.8V26.25C23.25 27.903 21.903 29.25 20.25 29.25H3.75C2.097 29.25 0.75 27.903 0.75 26.25V3.75ZM13.7835 3.75H3.75V26.25H20.25V10.788L13.806 3.7605L13.8015 3.759C13.796 3.75503 13.79 3.75199 13.7835 3.75Z" fill="#B18718"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.785 0.75C14.1829 0.75 14.5644 0.908035 14.8457 1.18934C15.127 1.47064 15.285 1.85218 15.285 2.25V9.3H21.75C21.947 9.3 22.1421 9.3388 22.3241 9.41418C22.506 9.48956 22.6714 9.60005 22.8107 9.73934C22.95 9.87863 23.0605 10.044 23.1359 10.226C23.2112 10.408 23.25 10.603 23.25 10.8C23.25 10.997 23.2112 11.192 23.1359 11.374C23.0605 11.556 22.95 11.7214 22.8107 11.8607C22.6714 11.9999 22.506 12.1104 22.3241 12.1858C22.1421 12.2612 21.947 12.3 21.75 12.3H13.785C13.3872 12.3 13.0057 12.142 12.7244 11.8607C12.4431 11.5794 12.285 11.1978 12.285 10.8V2.25C12.285 1.85218 12.4431 1.47064 12.7244 1.18934C13.0057 0.908035 13.3872 0.75 13.785 0.75Z" fill="#B18718"/>
</svg>

                        </span>
                        <span data-toggle="tooltip" data-placement="top" title="عرض الملف" @click="open_file_2(payment)" class="fs-5 cotract files_details" style="color: #B18718;cursor:pointer">
                          {{ payment.platform_receipt.name.slice(0,5) ?  payment.platform_receipt.name.slice(0,5) : '' }}
                        </span>
                        </div>
             </div>
             <div class="col-4 content-text text-center files_details" style="direction: ltr;color: #B18718;">
                    {{ payment.platform_receipt.size + " KB "}} 
                </div>
                <div class="col-4 content-text text-center files_details" style="color: #B18718;">
                  {{new Date(payment.created_at).toLocaleDateString() }}
                </div>
            </div>
            <div  class="row justify-content-between align-items-baseline thirdCard mt-2">
                <div class="col-4 text-center">
                    <div class="content-text text-center">
                        <span class="ps-2">
                          <svg width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.625 17.25C5.625 16.9516 5.74353 16.6655 5.9545 16.4545C6.16548 16.2435 6.45163 16.125 6.75 16.125H17.25C17.5484 16.125 17.8345 16.2435 18.0455 16.4545C18.2565 16.6655 18.375 16.9516 18.375 17.25C18.375 17.5484 18.2565 17.8345 18.0455 18.0455C17.8345 18.2565 17.5484 18.375 17.25 18.375H6.75C6.45163 18.375 6.16548 18.2565 5.9545 18.0455C5.74353 17.8345 5.625 17.5484 5.625 17.25ZM5.625 21.75C5.625 21.4516 5.74353 21.1655 5.9545 20.9545C6.16548 20.7435 6.45163 20.625 6.75 20.625H17.25C17.5484 20.625 17.8345 20.7435 18.0455 20.9545C18.2565 21.1655 18.375 21.4516 18.375 21.75C18.375 22.0484 18.2565 22.3345 18.0455 22.5455C17.8345 22.7565 17.5484 22.875 17.25 22.875H6.75C6.45163 22.875 6.16548 22.7565 5.9545 22.5455C5.74353 22.3345 5.625 22.0484 5.625 21.75Z" fill="#B18718"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 3.75C0.75 2.097 2.097 0.75 3.75 0.75H13.785C14.628 0.75 15.423 1.107 15.9825 1.6965L15.9915 1.707L22.4595 8.76C22.998 9.3345 23.25 10.086 23.25 10.8V26.25C23.25 27.903 21.903 29.25 20.25 29.25H3.75C2.097 29.25 0.75 27.903 0.75 26.25V3.75ZM13.7835 3.75H3.75V26.25H20.25V10.788L13.806 3.7605L13.8015 3.759C13.796 3.75503 13.79 3.75199 13.7835 3.75Z" fill="#B18718"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.785 0.75C14.1829 0.75 14.5644 0.908035 14.8457 1.18934C15.127 1.47064 15.285 1.85218 15.285 2.25V9.3H21.75C21.947 9.3 22.1421 9.3388 22.3241 9.41418C22.506 9.48956 22.6714 9.60005 22.8107 9.73934C22.95 9.87863 23.0605 10.044 23.1359 10.226C23.2112 10.408 23.25 10.603 23.25 10.8C23.25 10.997 23.2112 11.192 23.1359 11.374C23.0605 11.556 22.95 11.7214 22.8107 11.8607C22.6714 11.9999 22.506 12.1104 22.3241 12.1858C22.1421 12.2612 21.947 12.3 21.75 12.3H13.785C13.3872 12.3 13.0057 12.142 12.7244 11.8607C12.4431 11.5794 12.285 11.1978 12.285 10.8V2.25C12.285 1.85218 12.4431 1.47064 12.7244 1.18934C13.0057 0.908035 13.3872 0.75 13.785 0.75Z" fill="#B18718"/>
</svg>

                        </span>
                        <span @click="open_file_1(payment)" data-toggle="tooltip" data-placement="top" title="عرض الملف" class="fs-5 cotract files_details" style="color: #B18718;cursor:pointer">
                          {{ payment.receipt.name ? payment.receipt.name.slice(0,5) : '' }}
                        </span>
                        </div>
                </div>
                <div class="col-4 content-text text-center files_details" style="direction: ltr;color: #B18718;">
                    {{ payment.receipt.size + " KB "}} 
                </div>
                <div class="col-4 content-text text-center files_details" style="color: #B18718;">
                  {{new Date(payment.created_at).toLocaleDateString() }}
                </div>
                                  
            </div>
                        <!--نهاية تأكيد استلام المرحلة-->

           </div>           

            </div>
      </div>
     </div>
     <!--end files-->
   <!--start updates-->
   <div class="add-update text-center py-3">
      <span class="اضافة تعديل">
        <svg width="90" height="17" viewBox="0 0 90 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.72063 12V10.144H11.4006V12H9.72063ZM5.11263 15.968C4.18463 15.968 3.35263 15.7973 2.61663 15.456C1.89129 15.1253 1.32063 14.6613 0.904625 14.064C0.488625 13.4667 0.280625 12.7893 0.280625 12.032C0.280625 11.8187 0.296625 11.536 0.328625 11.184C0.360625 10.832 0.403292 10.4373 0.456625 10C0.520625 9.56267 0.584625 9.12 0.648625 8.672C0.723292 8.21333 0.792625 7.77067 0.856625 7.344L2.96863 7.632C2.85129 8.34667 2.74996 9.00267 2.66463 9.6C2.58996 10.1867 2.53129 10.688 2.48863 11.104C2.44596 11.52 2.42463 11.824 2.42463 12.016C2.42463 12.4427 2.53129 12.8107 2.74463 13.12C2.95796 13.4293 3.26196 13.6693 3.65663 13.84C4.06196 14.0213 4.54729 14.112 5.11263 14.112C5.69929 14.112 6.17396 14.0267 6.53663 13.856C6.89929 13.6853 7.16063 13.4507 7.32063 13.152C7.49129 12.8533 7.57663 12.5173 7.57663 12.144V0.688H9.72063V12.144C9.72063 12.912 9.51796 13.584 9.11263 14.16C8.71796 14.736 8.17396 15.1787 7.48063 15.488C6.78729 15.808 5.99796 15.968 5.11263 15.968ZM11.4006 12V10.144C11.5286 10.144 11.614 10.2293 11.6566 10.4C11.6993 10.56 11.7206 10.784 11.7206 11.072C11.7206 11.3493 11.6993 11.5733 11.6566 11.744C11.614 11.9147 11.5286 12 11.4006 12ZM11.4062 12V10.144H15.1983L13.9503 11.184V3.968H16.0783V12H11.4062ZM11.4062 12C11.2782 12 11.1929 11.9147 11.1502 11.744C11.1076 11.5733 11.0862 11.3493 11.0862 11.072C11.0862 10.784 11.1076 10.56 11.1502 10.4C11.1929 10.2293 11.2782 10.144 11.4062 10.144V12ZM12.0463 15.328V13.504H14.1903V15.328H12.0463ZM14.2383 15.328V13.504H16.3823V15.328H14.2383ZM24.386 12V10.144H26.066V12H24.386ZM17.89 12V10.144H23.698L22.242 11.408V8.72C22.242 7.96267 22.162 7.376 22.002 6.96C21.8527 6.544 21.5967 6.25067 21.234 6.08C20.882 5.90933 20.3967 5.824 19.778 5.824H18.482V3.968H19.778C20.7593 3.968 21.5913 4.128 22.274 4.448C22.9673 4.768 23.49 5.28 23.842 5.984C24.2047 6.67733 24.386 7.58933 24.386 8.72V12H17.89ZM26.066 12V10.144C26.194 10.144 26.2793 10.2293 26.322 10.4C26.3647 10.56 26.386 10.784 26.386 11.072C26.386 11.3493 26.3647 11.5733 26.322 11.744C26.2793 11.9147 26.194 12 26.066 12ZM26.0625 12V10.144H29.4545C29.9132 10.144 30.3558 10.0587 30.7825 9.888C31.2092 9.70667 31.5985 9.472 31.9505 9.184C32.3132 8.88533 32.6278 8.56 32.8945 8.208C33.1718 7.84533 33.3852 7.47733 33.5345 7.104C33.6945 6.73067 33.7745 6.37867 33.7745 6.048V5.024L34.7985 6.72C34.2438 6.42133 33.6785 6.19733 33.1025 6.048C32.5265 5.89867 31.9772 5.824 31.4545 5.824C30.9425 5.824 30.3932 5.89867 29.8065 6.048C29.2305 6.19733 28.6705 6.42133 28.1265 6.72L29.1505 5.024V6.048C29.1505 6.37867 29.2252 6.73067 29.3745 7.104C29.5345 7.47733 29.7478 7.84533 30.0145 8.208C30.2812 8.56 30.5958 8.88533 30.9585 9.184C31.3212 9.472 31.7158 9.70667 32.1425 9.888C32.5692 10.0587 33.0065 10.144 33.4545 10.144H36.7505V12H34.1265C33.2945 12 32.5158 11.8667 31.7905 11.6C31.0652 11.3333 30.4092 10.9813 29.8225 10.544C29.2358 10.096 28.7292 9.61067 28.3025 9.088C27.8865 8.55467 27.5665 8.02667 27.3425 7.504C27.1185 6.97067 27.0065 6.48533 27.0065 6.048V5.136C27.4652 4.88 27.9505 4.66667 28.4625 4.496C28.9852 4.32533 29.5025 4.19733 30.0145 4.112C30.5372 4.016 31.0172 3.968 31.4545 3.968C31.9025 3.968 32.3825 4.016 32.8945 4.112C33.4065 4.19733 33.9185 4.32533 34.4305 4.496C34.9532 4.66667 35.4438 4.88 35.9025 5.136V6.048C35.9025 6.48533 35.7905 6.97067 35.5665 7.504C35.3425 8.02667 35.0172 8.55467 34.5905 9.088C34.1745 9.61067 33.6732 10.096 33.0865 10.544C32.4998 10.9813 31.8438 11.3333 31.1185 11.6C30.3932 11.8667 29.6145 12 28.7825 12H26.0625ZM26.0625 12C25.9345 12 25.8492 11.9147 25.8065 11.744C25.7638 11.5733 25.7425 11.3493 25.7425 11.072C25.7425 10.784 25.7638 10.56 25.8065 10.4C25.8492 10.2293 25.9345 10.144 26.0625 10.144V12ZM36.7505 12V10.144C36.8785 10.144 36.9638 10.2293 37.0065 10.4C37.0492 10.56 37.0705 10.784 37.0705 11.072C37.0705 11.3493 37.0492 11.5733 37.0065 11.744C36.9638 11.9147 36.8785 12 36.7505 12ZM36.75 12V10.144H40.542L39.294 11.184V3.968H41.422V12H36.75ZM36.75 12C36.622 12 36.5367 11.9147 36.494 11.744C36.4513 11.5733 36.43 11.3493 36.43 11.072C36.43 10.784 36.4513 10.56 36.494 10.4C36.5367 10.2293 36.622 10.144 36.75 10.144V12ZM37.39 3.008V1.184H39.534V3.008H37.39ZM39.582 3.008V1.184H41.726V3.008H39.582ZM50.6861 12C49.7795 12 49.0328 11.856 48.4461 11.568C47.8595 11.28 47.4221 10.8427 47.1341 10.256C46.8568 9.66933 46.7181 8.928 46.7181 8.032C46.7181 7.136 46.8568 6.38933 47.1341 5.792C47.4221 5.184 47.8595 4.73067 48.4461 4.432C49.0328 4.12267 49.7795 3.968 50.6861 3.968H54.3021V10.992H52.1581V5.36L52.6861 5.824H50.6861C50.2488 5.824 49.8968 5.87733 49.6301 5.984C49.3635 6.08 49.1661 6.288 49.0381 6.608C48.9208 6.91733 48.8621 7.392 48.8621 8.032C48.8621 8.64 48.9155 9.09867 49.0221 9.408C49.1395 9.70667 49.3315 9.904 49.5981 10C49.8648 10.096 50.2275 10.144 50.6861 10.144H55.9821V12H50.6861ZM55.9821 12V10.144C56.1101 10.144 56.1955 10.2293 56.2381 10.4C56.2808 10.56 56.3021 10.784 56.3021 11.072C56.3021 11.3493 56.2808 11.5733 56.2381 11.744C56.1955 11.9147 56.1101 12 55.9821 12ZM48.7341 3.008V1.184H50.8781V3.008H48.7341ZM50.9261 3.008V1.184H53.0701V3.008H50.9261ZM55.9844 12V10.144H63.4564L62.8004 10.704V5.36L63.3444 5.824H61.3284C60.859 5.824 60.491 5.88267 60.2244 6C59.9577 6.11733 59.771 6.336 59.6644 6.656C59.5577 6.96533 59.5044 7.408 59.5044 7.984C59.5044 8.61333 59.5577 9.08267 59.6644 9.392C59.771 9.69067 59.9577 9.89333 60.2244 10C60.491 10.096 60.859 10.144 61.3284 10.144V11.808C60.4217 11.808 59.675 11.68 59.0884 11.424C58.5017 11.168 58.0644 10.7627 57.7764 10.208C57.499 9.64267 57.3604 8.90133 57.3604 7.984C57.3604 7.10933 57.499 6.37333 57.7764 5.776C58.0644 5.17867 58.5017 4.73067 59.0884 4.432C59.675 4.12267 60.4217 3.968 61.3284 3.968H64.9444V12H55.9844ZM55.9844 12C55.8564 12 55.771 11.9147 55.7284 11.744C55.6857 11.5733 55.6644 11.3493 55.6644 11.072C55.6644 10.784 55.6857 10.56 55.7284 10.4C55.771 10.2293 55.8564 10.144 55.9844 10.144V12ZM60.4804 2.496V0.672H62.6244V2.496H60.4804ZM69.6305 12V10.144H71.4545V12H69.6305ZM67.5025 12V0.688H69.6305V12H67.5025ZM71.4545 12V10.144C71.5825 10.144 71.6678 10.2293 71.7105 10.4C71.7532 10.56 71.7745 10.784 71.7745 11.072C71.7745 11.3493 71.7532 11.5733 71.7105 11.744C71.6678 11.9147 71.5825 12 71.4545 12ZM71.4531 12V10.144H83.5491L81.7411 11.712V8.352C81.7411 7.744 81.6611 7.25867 81.5011 6.896C81.3411 6.52267 81.1065 6.25067 80.7971 6.08C80.4985 5.90933 80.1358 5.824 79.7091 5.824C79.2505 5.824 78.8131 5.91467 78.3971 6.096C77.9918 6.27733 77.6131 6.512 77.2611 6.8C76.9091 7.088 76.5838 7.39733 76.2851 7.728C75.9865 8.05867 75.7198 8.37867 75.4851 8.688C75.2505 8.98667 75.0478 9.24267 74.8771 9.456L74.3971 7.904C74.8131 7.40267 75.1865 6.944 75.5171 6.528C75.8478 6.112 76.1625 5.744 76.4611 5.424C76.7705 5.104 77.0905 4.83733 77.4211 4.624C77.7625 4.41067 78.1305 4.25067 78.5251 4.144C78.9305 4.02667 79.3998 3.968 79.9331 3.968C80.6478 3.968 81.2558 4.09067 81.7571 4.336C82.2585 4.57067 82.6638 4.896 82.9731 5.312C83.2931 5.728 83.5225 6.19733 83.6611 6.72C83.8105 7.24267 83.8851 7.78667 83.8851 8.352V12H71.4531ZM73.4691 10.144V3.968H75.6131V10.144H73.4691ZM71.4531 12C71.3251 12 71.2398 11.9147 71.1971 11.744C71.1545 11.5733 71.1331 11.3493 71.1331 11.072C71.1331 10.784 71.1545 10.56 71.1971 10.4C71.2398 10.2293 71.3251 10.144 71.4531 10.144V12ZM77.7891 2.512V0.688H79.9331V2.512H77.7891ZM86.4244 12V0.688H88.5524V12H86.4244ZM86.5204 16.784C86.3177 16.5387 86.163 16.304 86.0564 16.08C85.9497 15.856 85.8964 15.616 85.8964 15.36C85.8964 14.9973 85.9924 14.6667 86.1844 14.368C86.3764 14.08 86.627 13.8507 86.9364 13.68C87.2457 13.52 87.587 13.44 87.9604 13.44C88.163 13.44 88.371 13.4667 88.5844 13.52C88.7977 13.5733 88.979 13.6533 89.1284 13.76L88.5844 14.736C88.4884 14.6827 88.3924 14.6453 88.2964 14.624C88.211 14.6133 88.1204 14.608 88.0244 14.608C87.7684 14.608 87.571 14.672 87.4324 14.8C87.2937 14.9387 87.2244 15.12 87.2244 15.344C87.2244 15.472 87.251 15.5947 87.3044 15.712C87.3577 15.8293 87.4377 15.9573 87.5444 16.096L86.5204 16.784ZM85.5444 16.912V15.744H89.4164V16.912H85.5444Z" fill="#0C483F"/>
        </svg>
        </span>
       </div>
       <div class="input-group px-4">
        <textarea placeholder="اكتب ملاحظاتك وتعديلات هنا......" v-model="startWork.notes_" class="form-control" rows="7" style="border: 1px solid #000000;" aria-label="With textarea"></textarea>
       </div>
     <!--end updates-->
     <!--start notes-->
     <div class="note text-center pt-4">
       <span class="fs-6" style="font-weight: 700;">
        <span class="fs-6" style="color: #B18718;font-weight: 700;">تنويه :</span>
        مدة المراجعة لا تحتسب من ضمن الجدول الزمني للمشروع لحين      
        </span>
       <div class="text-center pt-4">
         <span class="fs-6" style="font-weight: 700;">
          قبول المرحلة نهائيًا او إرسال طلب تعديل للمكتب الهندسي للمرحلة        
        </span>
       </div>
     </div>
     <!--end notes-->
     <!--start buttons-->
   <div class="send-upload py-3">
    <div class="row justify-content-center">
      <div class="text-center d-xl-flex d-lg-flex d-md-flex d-sm-grid d-grid col-12  justify-content-center">
        <div 
        @click="startWork.deliver_stage(`${api}office/contracts/deliver`)"
        class="btn rounded-3"
        style="background-color: #B18718;">
        <span 
        @click="startWork.deliver_stage(`${api}office/contracts/deliver`), getProjectData.getOneProject(`https://test.m-aboelela.online/api/office/projects/show/${route.params.id}`)"
        class="fs-6 text-white" v-if="startWork.loading == false">ارسال</span>
          <span 
        class="fs-6 d-inline-block text-white" v-if="startWork.loading == false">
        <atom-spinner v-if="startWork.loading == true"  :animation-duration="1000" :size="40" color="white" />          </span>
        </div>
      <div class="seprator my-1 mx-2"></div>
      <div class="btn rounded-3" style="border: 2px solid #B18718;cursor: pointer;">
        <label for="addFile" style="color: #B18718;cursor: pointer;" class="px-5 fs-6">اضافة مرفق</label>
        <input @change="startWork.getFirstImage($event)" id="addFile" class="d-none"  accept="image/*" type="file">
      </div>
      </div>
      <div class="text-center"><span class="text-danger fs-5">{{ startWork.registerd }}</span></div>
      <div class="text-center"><span class="text-danger fs-5">{{ startWork.first.name }}</span></div>
      
    </div>
   </div>
     <!--end buttons-->
<div class="text-center تنويه">
  <span class="fs-6" style="font-weight: 700;color: #48847B;">
    *سيتم إشعار  العميل بتسليمكم للمرحلة بشكل آلي*
    </span>
</div>
<div class="text-center py-4">
  <span @click="startWork.handleCloseForm()"  style="cursor: pointer;" data-toggle="modal" data-target="#editRequest">
    <svg class="exit" width="100" height="30" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="1" width="98" height="28" rx="4" stroke="black" stroke-width="2"/>
<path d="M40.1596 22.52V21.305H41.2096V22.52H40.1596ZM39.2296 24.785C38.4896 24.785 37.8446 24.67 37.2946 24.44C36.7546 24.21 36.3396 23.87 36.0496 23.42C35.7596 22.97 35.6146 22.43 35.6146 21.8C35.6146 21.17 35.7596 20.635 36.0496 20.195C36.3396 19.755 36.7546 19.42 37.2946 19.19C37.8446 18.96 38.4946 18.845 39.2446 18.845H41.6146V15.605C41.6146 14.955 41.4096 14.47 40.9996 14.15C40.5896 13.83 39.9746 13.67 39.1546 13.67C38.8946 13.67 38.5246 13.695 38.0446 13.745C37.5646 13.785 37.0546 13.845 36.5146 13.925L36.3796 12.875C36.7896 12.775 37.2396 12.69 37.7296 12.62C38.2196 12.54 38.6946 12.5 39.1546 12.5C39.9146 12.5 40.5746 12.62 41.1346 12.86C41.6946 13.1 42.1246 13.45 42.4246 13.91C42.7246 14.37 42.8746 14.935 42.8746 15.605V20H39.2446C38.4346 20 37.8396 20.15 37.4596 20.45C37.0896 20.76 36.9046 21.215 36.9046 21.815C36.9046 22.405 37.0896 22.855 37.4596 23.165C37.8396 23.475 38.4296 23.63 39.2296 23.63C39.4096 23.63 39.6096 23.62 39.8296 23.6C40.0596 23.58 40.3346 23.55 40.6546 23.51L40.8496 24.605C40.6096 24.655 40.3496 24.695 40.0696 24.725C39.7896 24.765 39.5096 24.785 39.2296 24.785ZM47.2994 23.375C46.9394 23.375 46.5594 23.345 46.1594 23.285C45.7694 23.235 45.3394 23.16 44.8694 23.06L45.0644 22.025C45.5944 22.095 46.0344 22.145 46.3844 22.175C46.7444 22.205 47.0494 22.22 47.2994 22.22C48.1094 22.22 48.6994 22.065 49.0694 21.755C49.4394 21.445 49.6244 20.995 49.6244 20.405V13.265L50.2094 13.655H47.7644C47.2144 13.655 46.7844 13.725 46.4744 13.865C46.1744 13.995 45.9644 14.245 45.8444 14.615C45.7244 14.985 45.6644 15.53 45.6644 16.25C45.6644 16.97 45.7194 17.515 45.8294 17.885C45.9494 18.255 46.1644 18.51 46.4744 18.65C46.7844 18.78 47.2144 18.845 47.7644 18.845H49.6244V20H47.7644C46.9044 20 46.2244 19.87 45.7244 19.61C45.2344 19.34 44.8844 18.93 44.6744 18.38C44.4744 17.82 44.3744 17.11 44.3744 16.25C44.3744 15.4 44.4744 14.695 44.6744 14.135C44.8844 13.575 45.2344 13.165 45.7244 12.905C46.2244 12.635 46.9044 12.5 47.7644 12.5H50.9144V20.39C50.9144 21.02 50.7694 21.56 50.4794 22.01C50.1894 22.46 49.7744 22.8 49.2344 23.03C48.6944 23.26 48.0494 23.375 47.2994 23.375ZM54.7215 20V18.845H56.6415V20H54.7215ZM52.2165 23.375C52.0865 23.375 51.9515 23.365 51.8115 23.345C51.6615 23.335 51.5165 23.325 51.3765 23.315L51.4965 22.16C51.6365 22.17 51.7715 22.18 51.9015 22.19C52.0215 22.21 52.1265 22.22 52.2165 22.22C52.6765 22.22 53.0465 22.045 53.3265 21.695C53.6065 21.345 53.7465 20.86 53.7465 20.24V12.5H55.0365V20.24C55.0365 20.86 54.9165 21.405 54.6765 21.875C54.4365 22.355 54.1015 22.725 53.6715 22.985C53.2515 23.245 52.7665 23.375 52.2165 23.375ZM56.6415 20V18.845C56.7715 18.845 56.8515 18.895 56.8815 18.995C56.9215 19.095 56.9415 19.235 56.9415 19.415C56.9415 19.585 56.9215 19.725 56.8815 19.835C56.8515 19.945 56.7715 20 56.6415 20ZM56.6357 20V18.845H63.2207L62.8307 19.19V15.605C62.8307 14.955 62.6257 14.47 62.2157 14.15C61.8157 13.83 61.2057 13.67 60.3857 13.67C60.1257 13.67 59.7557 13.695 59.2757 13.745C58.8057 13.785 58.3057 13.84 57.7757 13.91L57.6257 12.875C58.0357 12.775 58.4807 12.69 58.9607 12.62C59.4507 12.54 59.9257 12.5 60.3857 12.5C61.1457 12.5 61.8057 12.62 62.3657 12.86C62.9257 13.1 63.3557 13.45 63.6557 13.91C63.9557 14.37 64.1057 14.935 64.1057 15.605V20H56.6357ZM56.6357 20C56.5057 20 56.4257 19.945 56.3957 19.835C56.3557 19.725 56.3357 19.585 56.3357 19.415C56.3357 19.235 56.3557 19.095 56.3957 18.995C56.4257 18.895 56.5057 18.845 56.6357 18.845V20ZM59.7407 11.45V10.055H61.0307V11.45H59.7407Z" fill="black"/>
</svg>
</span>
</div>
    </div>
  </div>
</div>
<!--نهاية تسليم مرحلة -->
<!--
   <div class="me-5 fs-5 mt-2" style="width:40%;">
            <h5 class="text-warning" style="font-weight:700;">{{ 'عنوان الطلب....' }}</h5>
            <p class="w-100 text-white">{{ payment.notes }}</p>
            </div>
-->

  <div class="container">
    <div class="my-5">
      <div class="card col-md-7 col-sm-12 text-center">
        <div class="card-body">
          <span class="card-content ">تنويه</span>: حفاظًا علي الجدول الزمني لمشروعك يلزم إرسال طلب بدء أعمال للمكتب
          الهندسي.
        </div>
      </div>

      <div class="header">
        المراحل المستلمة
      </div>

      <div class="card col-lg-6 col-sm-12 my-5 " v-for="stage in getProjectData.stages" :key="stage">
        <div class="d-flex justify-content-between align-items-baseline mt-2 ">
          <span class="first-svg">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
              <circle cx="15" cy="15.7217" r="15" fill="#FF5555" />
              <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="16" fill="white">5</text>
            </svg>
          </span>
          <div class=" ">
            <p class="me-3">{{ stage.stage_title }}</p>
          </div>
        
<div class="text-start">
  <!--
            <button disabled class="first-stage mx-2" @click="showModal">طلب تعديل</button>

  -->
            <modal-component v-if="isModalVisible" @close="closeModal"></modal-component>
            <button
            style="background-color: ;"
            data-toggle="modal" data-target="#editRequest" class="request-start-working mx-2" @click="startWork.handleRecieveWorkValues(stage),startWork.handleCloseForm()" >تسليم مرحلة</button>
          </div>
        
          
        </div>
        <div class="seperator"></div>
        <div class="d-flex justify-content-between align-items-baseline my-2 lastCard">
          <div class="span-stage">
            <span>عدد التعديلات: <span class="numbers">{{ stage.edits_count }} </span></span>
            <span class="fasel"> | </span>
            <span>عدد ايام المرحلة: <span class="numbers"> ({{ '5' }}) يوم </span></span>
          </div>
          <div class="button-stage">
            <button class=" request-start-working mx-2" @click="payments = stage.payments" data-toggle="modal" data-target=".bd-example-modal-lg" type="button">قبول طلبات الاعمال</button>
            <!--
            <button class="edit-button mx-2">إضافة امر تغيير</button>

            -->
          </div>
        </div>
      </div>
      <!-- start second card -->
      <div class="comments" id="scrollDiv2" style="max-height: 60vh;overflow-y: scroll;">
        <div class="card col-md-6 col-sm-12 my-3" v-for="comment , index in getProjectData.comments" :key="index">
        <div class="d-flex justify-content-between p-2">
          <span class="second-card-title">مرحلة الاستفسارات</span>
          <div class="stars ms-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <path d="M5.825 22.7217L8.15 15.1217L2 10.7217H9.6L12 2.72168L14.4 10.7217H22L15.85 15.1217L18.175 22.7217L12 18.0217L5.825 22.7217Z" fill="#007060"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <path d="M5.825 22.7217L8.15 15.1217L2 10.7217H9.6L12 2.72168L14.4 10.7217H22L15.85 15.1217L18.175 22.7217L12 18.0217L5.825 22.7217Z" fill="#007060"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <path d="M5.825 22.7217L8.15 15.1217L2 10.7217H9.6L12 2.72168L14.4 10.7217H22L15.85 15.1217L18.175 22.7217L12 18.0217L5.825 22.7217Z" fill="#007060"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <path d="M5.825 22.7217L8.15 15.1217L2 10.7217H9.6L12 2.72168L14.4 10.7217H22L15.85 15.1217L18.175 22.7217L12 18.0217L5.825 22.7217Z" fill="#007060"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <path d="M5.825 22.7217L8.15 15.1217L2 10.7217H9.6L12 2.72168L14.4 10.7217H22L15.85 15.1217L18.175 22.7217L12 18.0217L5.825 22.7217Z" fill="#007060"/>
            </svg>
          </div>
        </div>
        <div class="d-flex justify-content-between p-2">
          <span class="rate">{{ comment.created_at.slice(0,comment.created_at.indexOf('T')) }}</span>
          <span class="rate">{{ comment.comment }}</span>
        </div>
      </div>
      </div >
    

      

      <!-- sction of modal -->
       
    </div>
  </div>
</template>

<script setup>
import {start_work} from '@/stores/start_work/start_work'
import { AtomSpinner } from 'epic-spinners'
import { onMounted, ref } from 'vue';
import { projectFile } from '@/stores/projectFiles';
import { useRoute } from 'vue-router';
import {project_api} from '@/stores/api';
/*
import { ref } from 'vue';

//import ModalComponent from "../../components/projectPhaseModal";
 const isModalVisible = ref(false) 
 const showModal = ()=>{
  isModalVisible.value = true;
 }
  const closeModal = ()=>{
    isModalVisible.value = false;
}
*/
const open_file_1 =(payment)=>{
      window.open(payment.receipt.url, '_blank')
    }
    const open_file_2 =(payment)=>{
      window.open(payment.platform_receipt.url, '_blank')
    }
const startWork = start_work()
const acceptOrRejectWork = start_work();
const api = ref(project_api);
const route = useRoute();
const payments = ref([])
//const stages = ref('');
//const comments = ref([]);
const getProjectData = projectFile();
onMounted(async() => {
await  getProjectData.getOneProject(`https://test.m-aboelela.online/api/office/projects/show/${route.params.id}`);
//startWork.show_Stage("https://test.m-aboelela.online/api/office/contracts/last_payment" , route.params.id);


 /* setTimeout(() => {
  stages.value =localStorage.getItem('stages') ?  JSON.parse(localStorage.getItem('stages')) : [];
  comments.value = localStorage.getItem('project') ? JSON.parse(localStorage.getItem('project')).comments : []
}, 10);*/   
});
</script>

<style  scoped>
* {
  direction: rtl;
}
#scrollDiv2::-webkit-scrollbar{
display: none;
}
.payment{
background-color: #336059;
  width: 100%;
  border-radius: 50px;
}
.card {
  position: relative;
  margin: auto;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.70);
}

.first-svg {
  position: absolute;
  top: -10px;
  right: -15px;
}

button {
  min-width: 9rem;
  border: none;
}

.card-body {
  color: #000;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.card-title {
  color: #336059;
  text-align: right;
  font-family: Cairo;
  font-size: 17px;
  font-weight: 600;
  white-space: nowrap;
}

.card-content {
  color: #007060;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
}

.header {
  color: #007060;
  font-family: Cairo;
  font-size: 25px;
  font-weight: 700;
  margin: 1rem 0;
  text-align: center;
}

.first-stage-text{
  color: #007060;
}
.first-stage {
  border-radius: 5px;
  border: 2px solid #4A4E53;
  color: #4A4E53;
  padding: 5px 25px;
  background-color: #fff;
}

.recieve-stage {
  border-radius: 5px;
  background: #007060;
  color: #FFFFFF;
  padding: 5px 25px;
  border: 2px solid #007060;
}

.seperator {
  border-bottom: 1px solid #007060;
  width: 99.9%;
}

/* .button-stage button {
  margin: 0rem 0.25rem;
} */

.numbers,
.fasel {
  color: #0C483F;
  font-family: Cairo;
  font-size: 17px;
  font-weight: 700;
}

.edit-button {
  border-radius: 5px;
  background: #4A4E53;
  color: #FFFFFF;
  padding: 5px 15px;
}

.request-start-working {
  border-radius: 5px;
  background: #007060;
  color: #FFFFFF;
  padding: 5px 15px;
  transition: 0.5s;
}
.request-start-working:hover{
  scale: 1.1;
}
.second-card-title {
  color: #007060;
  text-align: right;
  font-family: Cairo;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.rate {
  color: #747474;
  text-align: right;
  font-family: Cairo;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.stars svg {
  margin: 0px 5px;
}
@media (max-width: 778px) {
  .lastCard span {
    font-size: 14px;
  }

  .span-stage {
    width: 160px;
    
  }

  .lastCard button {
    font-size: 14px;
  }
}
@media (max-width:576px) {
  .payment{
    border-radius: 30px;
  }
  .btn{
    text-align: center !important;
  transition: 0.5s;
  }
.btn:hover{
  scale: 1.1;
}
  .lastCard span {
    font-size: 14px;
  }

  .span-stage {
    width: 160px;
  }

  .lastCard button {
    font-size: 14px;
  }
  
}

@media (max-width:505px) {
  .edit-button{
    margin-top: 5px;
  }
  .payment p{
    font-size: 6vw !important;
  }
  
}
@media (max-width:452px) {
  .stage_title{
  font-size: 5vw !important;
  width: 100% !important;
}
.first-stage , .recieve-stage , .request-start-working{
  margin-top: 5px !important;
}
.first-box{
  padding-bottom: 10px !important;
}
}
@media (max-width:429px) {
  .first-stage{
  margin-top: 5px;
  }
  .recieve-stage{
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .first-stage{
  margin-top: 5px;
  }
  .recieve-stage{
    margin-top: 5px;
    margin-bottom: 5px;
  }
  
}
</style>