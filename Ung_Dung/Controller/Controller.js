
//************** Xử lý Lưu trữ ***********
//************** Khai báo đường dẫn Dịch vụ  ***********

// var Dia_chi_Dich_vu = "http://localhost:1000";
// var Dia_chi_Media = "http://localhost:1001";
var Dia_chi_Dich_vu = " https://nodejs-data.herokuapp.com/";
var Dia_chi_Media = "https://nodejs-media.herokuapp.com/";
var Thu_muc_PDF = `../Tap_tin_PDF`
/****Gởi mail */
function Khach_hang_Lien_he(noi_dung) {
    var Kq = ""
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=GOI_THU_LIEN_HE`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    var Chuoi_goi = noi_dung
    Xu_ly_HTTP.send(Chuoi_goi)
    Kq = Xu_ly_HTTP.responseText
    return Kq
}

//Tải tập tin
function Tai_tap_tin(tap_tin, ten_moi) {
    var element = document.createElement("a")
    document.body.appendChild(element)
    element.setAttribute("href", `${Thu_muc_PDF}/${tap_tin}`)
    if (ten_moi != undefined) {
        element.setAttribute("download", `${ten_moi}`)
    } else {
        element.setAttribute("download", "")
    }
    element.click()
    document.body.removeChild(element)
}

//************** Các Hàm Xử lý Đọc Xuất   ***********
function Doc_Danh_sach_Tivi() {
    var Du_lieu = {}
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=DOC_DANH_SACH_TIVI`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    Xu_ly_HTTP.send("")
    var Chuoi_JSON = Xu_ly_HTTP.responseText
    if (Chuoi_JSON != "")
        Du_lieu = JSON.parse(Chuoi_JSON)
    return Du_lieu
}

function Doc_Thong_tin_Cua_hang() {
    var Du_lieu = {}
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=DOC_CUA_HANG`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    Xu_ly_HTTP.send("")
    var Chuoi_JSON = Xu_ly_HTTP.responseText
    if (Chuoi_JSON != "")
        Du_lieu = JSON.parse(Chuoi_JSON)
    return Du_lieu
}

function Ghi_Phieu_Dat_hang(DsPhieu_dat) {
    var Kq = ""
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Ghi_Phieu_Dat_hang`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    var Chuoi_goi = JSON.stringify(DsPhieu_dat)
    Xu_ly_HTTP.send(Chuoi_goi)
    Kq = Xu_ly_HTTP.responseText
    return Kq
}
// ================LOGIN================
function Dang_nhap(Nguoi_dung) {
    var Du_lieu = {}
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Dang_nhap`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    var Chuoi_Goi = JSON.stringify(Nguoi_dung)
    Xu_ly_HTTP.send(Chuoi_Goi)
    var Chuoi_JSON = Xu_ly_HTTP.responseText
    if (Chuoi_JSON != "")
        Du_lieu = JSON.parse(Chuoi_JSON)
    return Du_lieu
}
// ***************************** Xuất ***********************
function Xuat_Thong_tin_Cua_hang(Cua_Hang, Th_Cha) {
    var Chuoi_HTML = `
    <img class="logo" src="${Dia_chi_Media}/${Cua_Hang.Ma_so.logo}.png" id="navbar__logo-lg">
    `
    Th_Cha.innerHTML = Chuoi_HTML
}
function Xuat_Thong_tin_Cua_hang_Footer(Cua_Hang, Th_Cha) {
    var Chuoi_HTML = `
    <img src="${Dia_chi_Media}/${Cua_Hang.Ma_so.flogo}.png">
    <p>&reg; 2019</p>
    <p>Nhóm 2 - [JS250] :<br /> ${Cua_Hang.Ma_so.Hoc_vien[0].Ho_ten} <br />${Cua_Hang.Ma_so.Hoc_vien[1].Ho_ten}</p>
    <p>All Rights Reserved.</p>
    `
    Th_Cha.innerHTML = Chuoi_HTML
}

function Tao_thanh_phan_trang(pages, Th_Phan_trang) {
    let noi_dung = ``
    noi_dung += `
    <div class="pagi">
        <div class="col-4 offset-4">
          <nav aria-label="Page navigation example" class="nav-pagination">
              <ul class="pagination pagination-circle pg-blue justify-content-center">
    `
    for (i = 1; i <= pages; i++) {
        noi_dung += `
        <li class="page-item"><a class="page-link" href="javaScript:void(0)">${i}</a></li>
        `
    }
    noi_dung += `</ul></nav></div>`
    Th_Phan_trang.innerHTML = noi_dung;
    let dsPhantrang = document.querySelectorAll(".pagination")
    dsPhantrang[0].childNodes[1].className += ' active';

}


function Xu_ly_Phan_trang() {
    let dsNut = document.querySelectorAll(".page-link");
    let dsLi = document.querySelectorAll(".page-item");
    dsNut.forEach(nut => {
        nut.onclick = () => {
            dsLi.forEach(li => {
                li.className = "page-item"
            })
            nut.parentNode.className += " active"
            let curPage = Number(nut.innerHTML)
            let vt = (curPage - 1) * limit
            Xuat_Danh_sach_Tivi(Danh_sach_Tivi, Th_Danh_sach, vt, limit)
            location.href = '#Th_Loc_gia';
            showModal()
            addCart()
        }
    })
}

function Xuat_Danh_sach_Tivi(Danh_sach, Th_Cha, vt, limit) {
    Th_Cha.innerHTML = "";
    let Dem = 0;
    Danh_sach.forEach((San_Pham, index) => {

        if (index >= vt && Dem < limit) {
            var Noi_dung_HTML = `
            <div class=" col-lg-4 col-md-6 col-sm-12 col-12 card-height">
                <div class="card product-card">
                        <img class="card-img-top img-fluid pic-1" src="${Dia_chi_Media}/${San_Pham.Ma_so}-1.jpg" alt="Card image cap">
                        <img class="card-img-top img-fluid pic-2" src="${Dia_chi_Media}/${San_Pham.Ma_so}-3.jpg" alt="Card image cap">
                    <div class="card-body text-center">
                        <h5 class="card-title card-title__product">${San_Pham.TenTV} <br />
                            <span class="small-text">${San_Pham.Code}</span>
                        </h5>
                        <p class="card-text">${San_Pham.Mo_ta}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            Nhập code để nhận ưu đãi từ 15/8 - 30/9</li>
                        <li class="list-group-item">Direct Full Array tái tạo hoàn hảo chi tiết hình ảnh</li>
                        <li class="list-group-item">Trí thông minh nhân tạo cho hình ảnh tối ưu</li>
                    </ul>
                    <div class="card-body product-card-button">
                        <div class="row">
                            <div class="col-6"><a  href="javaScript:void(0)" class="btn btn-light btn-read showmodal" data="${San_Pham.Ma_so}">Tìm hiểu thêm</a></div>
                            <div class="col-6"><a  href="javaScript:void(0)" class="btn btn-primary btn-add" data="${San_Pham.Ma_so}" >Thêm vào giỏ hàng</a></div>
                        </div>
                    </div>
                </div>
           </div>
            `
            Dem++
        } else {
            var Noi_dung_HTML = ``
        }

        Th_Cha.innerHTML += Noi_dung_HTML;
    })
    Th_Thong_bao.innerText = `${Danh_sach.length}`
}

function addCart() {
    let dsAdd = document.querySelectorAll(".btn-add");
    dsAdd.forEach(add => {
        add.onclick = () => {
            // alert(add.getAttribute('data'))

            let ma_so = add.getAttribute('data')
            let San_Pham = Danh_sach_Tivi.find(x => x.Ma_so == ma_so)

            var ds = []
            if (sessionStorage.getItem("Danh_sach_Chon") != undefined) {
                ds = JSON.parse(sessionStorage.getItem("Danh_sach_Chon"))
            }
            var vt = ds.indexOf(San_Pham.Ma_so)
            if (vt == -1) {
                ds.push(San_Pham.Ma_so)
            }

            if (ds.length > 0) {
                sessionStorage.setItem("Danh_sach_Chon", JSON.stringify(ds))
            } else {
                sessionStorage.removeItem("Danh_sach_Chon")
            }
            Th_Gio_hang.innerHTML = `<u class="scart-link">${ds.length}</u>`

            var Danh_sach_Cap_nhat = []
            Danh_sach_Chon = JSON.parse(sessionStorage.getItem("Danh_sach_Chon"))
            Danh_sach_Chon.forEach(Tv => {
                var San_Pham = Danh_sach_Tivi.find(x => x.Ma_so == Tv)
                Danh_sach_Cap_nhat.push(San_Pham)
            })
            var Noi_dung_HTML = `
            <div class="shopping-cart">
            <div class="column-labels">
                <label class="product-image">Image</label>
                <label class="product-details">Product</label>
                <label class="product-price">Giá</label>
                <label class="product-quantity">Số lượng</label>
                <label class="product-removal">Remove</label>
                <label class="product-line-price">Tổng tiền</label>
            </div>
            `
            Danh_sach_Cap_nhat.forEach(San_Pham => {
                Noi_dung_HTML += `
                <div class="product">
                    <div class="product-image">
                    <img src="${Dia_chi_Media}/${San_Pham.Ma_so}-1.jpg" class="img-fluid" alt="">
                    </div>
                    <div class="product-details">
                        <div class="product-title">${San_Pham.TenTV}</div>
                        <p class="product-description">${San_Pham.Mo_ta}</p>
                    </div>
                    <div class="product-price">${Tao_Chuoi_The_hien_So_nguyen_duong(San_Pham.Don_gia_Ban)}</div>
                    <div class="product-quantity">
                        <input type="number" value="1" min="1">
                    </div>
                    <div class="product-removal">
                        <button class="remove-product del" data="${San_Pham.Ma_so}"> 
                            Remove
                        </button>
                    </div>
                    <div class="product-line-price">${Tao_Chuoi_The_hien_So_nguyen_duong(San_Pham.Don_gia_Ban)}</div>
                    </div>
                `
            })
            Noi_dung_HTML += `

                <a  href="../layout/Task_Cart.html" class="checkout">Thanh toán</a>
            </div>
            `

            Th_DetailModal.innerHTML = Noi_dung_HTML
            Th_ShowModal.click()

            let dsDel = document.querySelectorAll(".del")
            dsDel.forEach(del => {
                del.onclick = () => {
                    alert("xóa thành công")
                    let ma_so = del.getAttribute('data')
                    let San_Pham = Danh_sach_Tivi.find(x => x.Ma_so == ma_so)

                    let vtdel = ds.indexOf(San_Pham.Ma_so)

                    if (vtdel !== -1) {
                        ds.splice(vtdel, 1)
                    }
                    if (ds.length > 0) {
                        sessionStorage.setItem("Danh_sach_Chon", JSON.stringify(ds))
                    } else {
                        sessionStorage.removeItem("Danh_sach_Chon")
                    }
                    Th_Gio_hang.innerHTML = `<u class="scart-link">${ds.length}</u>`
                    Th_ShowModal.click()
                }
               
            })  
        }
    })
}




function showModal() {
    let dsChitiet = document.querySelectorAll(".showmodal");
    dsChitiet.forEach((m) => {
        m.onclick = () => {
            let ma_so = m.getAttribute('data')
            let San_Pham = Danh_sach_Tivi.find(x => x.Ma_so == ma_so)
            Th_TitleModal.innerHTML = San_Pham.TenTV
            var Noi_dung_HTML = `
            <div class="container-fluid ">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card mb-10">
                        <div class="card-body store-body">
                            <div class="product-info">
                                <div class="product-gallery">
                                    <div class="product-gallery-thumbnails">
                                        <ol class="thumbnails-list list-unstyled">
                                            <li><img src="${Dia_chi_Media}/${San_Pham.Ma_so}-1.jpg" class="img-fluid" alt=""></li>
                                            <li><img src="${Dia_chi_Media}/${San_Pham.Ma_so}-2.jpg" class="img-fluid" alt=""></li>
                                            <li><img src="${Dia_chi_Media}/${San_Pham.Ma_so}-3.jpg" class="img-fluid" alt=""></li>
                                            <li><img src="${Dia_chi_Media}/${San_Pham.Ma_so}-4.jpg" class="img-fluid" alt=""></li>
                                            <li><img src="${Dia_chi_Media}/${San_Pham.Ma_so}-5.jpg" class="img-fluid" alt=""></li>
                                        </ol>
                                    </div>
                                    <div class="product-gallery-featured">
                                        <img src="${Dia_chi_Media}/${San_Pham.Ma_so}-1.jpg" class="img-fluid" alt="">
                                    </div>
                                </div>
                                <div class="product-seller-recommended">
                                    <div class="product-description mb-5">
                                        <h2 class="mb-5">Thông số kĩ thuật</h2>
                                        <dl class="row mb-5">
                                            <dt class="col-sm-3">Hãng</dt>
                                            <dd class="col-sm-9">${San_Pham.Nhom_Tivi.Ten}</dd>
                                            <dt class="col-sm-3">Kích thước</dt>
                                            <dd class="col-sm-9">${San_Pham.Kich_thuoc}</dd>
                                        </dl>
                                        <h2 class="mb-5">Thông tin</h2>
                                        <p>${San_Pham.Mo_ta}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="product-payment-details">
                                <h4 class="product-title mb-2" id="Th_Ten">${San_Pham.TenTV}</h4>
                                <p class="last-sold text-muted"><small>${San_Pham.Code}</small></p>
                                <h2 class="display-5 danger-ic font-weight-bold">${Tao_Chuoi_The_hien_So_nguyen_duong(San_Pham.Don_gia_Ban)} VNĐ</h2>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        Nhập code để nhận ưu đãi từ 15/8 - 30/9</li>
                                    <li class="list-group-item">Direct Full Array tái tạo hoàn hảo chi tiết hình ảnh
                                    </li>
                                    <li class="list-group-item">Trí thông minh nhân tạo cho hình ảnh tối ưu</li>
                                </ul>
                                <p class="mb-3 mt-3"><i class="fa fa-truck"></i> MIỄN PHÍ VẬN CHUYỂN VÀ LẮP ĐẶT Trả Góp
                                    0%</p>
                                <button class="btn btn-primary btn-lg btn-block btn-buy">Mua ngay</button>
                                <button class="btn btn-info btn-lg btn-block btn-atc" id="btn-atc">Thêm vào giỏ hàng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            `
            Th_DetailModal.innerHTML = Noi_dung_HTML
            Th_ShowModal.click()
            HoverImage();
        }
    })
}


function Tao_Chuoi_The_hien_So_nguyen_duong(So_nguyen) {
    var Chuoi_The_hien = ""
    var Chuoi_So_nguyen = So_nguyen.toString()
    var So_Ky_so = Chuoi_So_nguyen.length
    if (So_Ky_so % 3 == 0) {
        for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
            Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
            if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
                Chuoi_The_hien += "."
        }
    } else if (So_Ky_so % 3 == 1) {
        Chuoi_The_hien = Chuoi_So_nguyen[0]
        if (So_Ky_so > 1)
            Chuoi_The_hien += "."
        Chuoi_So_nguyen = Chuoi_So_nguyen.slice(1)
        for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
            Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
            if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
                Chuoi_The_hien += "."

        }
    } else if (So_Ky_so % 3 == 2) {
        Chuoi_The_hien = Chuoi_So_nguyen[0] + Chuoi_So_nguyen[1]
        if (So_Ky_so > 2)
            Chuoi_The_hien += "."
        Chuoi_So_nguyen = Chuoi_So_nguyen.slice(2)
        for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
            Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
            if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
                Chuoi_The_hien += "."
        }
    }
    return Chuoi_The_hien
}


// ==========================ADMIN ======================
function Xuat_Danh_sach_Tivi_Admin(Danh_sach, Th_Cha, vt, limit) {
    Th_Cha.innerHTML = "";
    let Dem = 0;
    Danh_sach.forEach((San_Pham, index) => {
        if (index >= vt && Dem < limit) {
            var Noi_dung_HTML = `
            <tr>
                <th scope="row text-center">${index + 1}</th>
                <td class="text-left">${San_Pham.TenTV}</td>
                <td class="text-center">${San_Pham.Nhom_Tivi.Ma_so}</td>
                <td class="text-center">${San_Pham.So_luong_Ton}</td>
                <td class="text-right">${Tao_Chuoi_The_hien_So_nguyen_duong(San_Pham.Don_gia_Ban)} </td>
                <td class="text-right">${Tao_Chuoi_The_hien_So_nguyen_duong(San_Pham.Don_gia_Nhap)} </td>
                <td class="text-center "><i class="fa fa-pencil-square-o" aria-hidden="true" ></td>
                <td class="text-center "><i  onclick="XoaSP()" class="fa fa-trash CAP_NHAP" aria-hidden="true" Ma_so="${San_Pham.Nhom_Tivi.Ma_so}"></i></td>
            </tr>
        `
            Dem++
        } else {
            var Noi_dung_HTML = ``
        }

        Th_Cha.innerHTML += Noi_dung_HTML
    })
    
}

function Xu_ly_Phan_trang_Admin() {
    let dsNut = document.querySelectorAll(".page-link");
    let dsLi = document.querySelectorAll(".page-item");
    dsNut.forEach(nut => {
        nut.onclick = () => {
            dsLi.forEach(li => {
                li.className = "page-item"
            })
            nut.parentNode.className += " active"
            let curPage = Number(nut.innerHTML)
            let vt = (curPage - 1) * limit
            Xuat_Danh_sach_Tivi_Admin(Danh_sach_Tivi, Th_Danh_sach, vt, limit)

        }
    })
}

function Tao_thanh_phan_trang(pages, Th_Phan_trang) {
    let noi_dung = ``
    noi_dung += `
    <div class="pagi">
        <div class="col-4 offset-4">
          <nav aria-label="Page navigation example" class="nav-pagination">
              <ul class="pagination pagination-circle pg-blue justify-content-center">
    `
    for (i = 1; i <= pages; i++) {
        noi_dung += `
        <li class="page-item"><a class="page-link" href="javaScript:void(0)">${i}</a></li>
        `
    }
    noi_dung += `</ul></nav></div>`
    Th_Phan_trang.innerHTML = noi_dung;
    let dsPhantrang = document.querySelectorAll(".pagination")
    dsPhantrang[0].childNodes[1].className += ' active';
}
function Ghi_San_Pham_Moi(San_Pham) {
    var Du_lieu = {}
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Ghi_Tivi_Moi`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    var Chuoi_Goi = JSON.stringify(San_Pham)
    Xu_ly_HTTP.send(Chuoi_Goi)
    var Chuoi_JSON = Xu_ly_HTTP.responseText
    if (Chuoi_JSON != "")
        Du_lieu = JSON.parse(Chuoi_JSON)
    return Du_lieu
}

function Ghi_Media(Hinh) {
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Dia_chi_Xu_ly = `${Dia_chi_Media}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    var Chuoi_Goi = JSON.stringify(Hinh)
    Xu_ly_HTTP.send(Chuoi_Goi)
    var Chuoi_KQ = Xu_ly_HTTP.responseText
    return Chuoi_KQ
}