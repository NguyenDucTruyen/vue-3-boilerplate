export enum Quyen {
  NGUOI_DUNG = 'NGUOI_DUNG',
  ADMIN = 'ADMIN',
}

export enum TrangThai {
  HOAT_DONG = 'HOAT_DONG',
  KHOA = 'KHOA',
}

export enum LoaiToken {
  ACCESS = 'ACCESS',
  REFRESH = 'REFRESH',
  RESET_PASSWORD = 'RESET_PASSWORD',
  VERIFY_EMAIL = 'VERIFY_EMAIL',
}

export enum LoaiOAuth {
  GOOGLE = 'GOOGLE',
  GITHUB = 'GITHUB',
}

export enum VaiTroKenh {
  THANH_VIEN = 'THANH_VIEN',
  CHU_KENH = 'CHU_KENH',
}

export enum TrangThaiThanhVien {
  YEU_CAU = 'YEU_CAU',
  THAM_GIA = 'THAM_GIA',
}

export enum HoatDongPhong {
  OFFLINE = 'OFFLINE',
  WAITING = 'WAITING',
  PRESENTING = 'PRESENTING',
}

export enum LoaiSlide {
  NOI_DUNG = 'NOI_DUNG',
  CAU_HOI = 'CAU_HOI',
}

export enum CachTrinhBay {
  CO_BAN = 'CO_BAN',
  TIEU_DE_LON = 'TIEU_DE_LON',
  HAI_COT = 'HAI_COT',
  DANH_SACH = 'DANH_SACH',
}

export enum Diem {
  BINH_THUONG = 'BINH_THUONG',
  GAP_DOI = 'GAP_DOI',
  KHONG_DIEM = 'KHONG_DIEM',
}

export enum LoaiCauHoi {
  SINGLE_SELECT = 'SINGLE_SELECT',
  MULTI_SELECT = 'MULTI_SELECT',
  TRUE_FALSE = 'TRUE_FALSE',
}

export enum VaiTroPhien {
  THANH_VIEN = 'THANH_VIEN',
  CHU_PHIEN = 'CHU_PHIEN',
}

export interface NguoiDung {
  maNguoiDung: string
  hoTen: string
  email: string
  matKhau: string
  anhDaiDien?: string
  quyen: Quyen
  trangThai: TrangThai
  daXacThucEmail: boolean
  ngayTao: string
  ngayCapNhat: string
}

export interface Token {
  maToken: string
  maNguoiDung: string
  loaiToken: LoaiToken
  token: string
  hetHan: string
  daSuDung: boolean
  ngayTao: string
}

export interface OAuth {
  maOauth: string
  maNguoiDung: string
  loaiOAuth: LoaiOAuth
  oauthId: string
  token: string
  ngayTao: string
}

export interface Kenh {
  maKenh: string
  tenKenh: string
  trangThai: TrangThai
  ngayTao: string
  ngayXoa?: string
}

export interface ThanhVienKenh {
  maThanhVienKenh: string
  maNguoiDung: string
  maKenh: string
  vaiTro: VaiTroKenh
  trangThai: TrangThaiThanhVien
  ngayTao: string
}

export interface Phong {
  maPhong: string
  tenPhong: string
  maKenh?: string
  maChuPhong: string
  trangThai: TrangThai
  hoatDong: HoatDongPhong
  ngayTao: string
  ngayXoa?: string
}

export interface Slide {
  maSlide: string
  maPhong: string
  loaiSlide: LoaiSlide
  thuTu: number
  tieuDe: string
  hinhAnh?: string
  video?: string
  hinhNen?: string
  cachTrinhBay?: CachTrinhBay
  noiDung?: string
  thoiGianGioiHan?: number
  diem: Diem
  loaiCauHoi?: LoaiCauHoi
}

export interface LuaChon {
  maLuaChon: string
  maSlide: string
  noiDung: string
  ketQua: boolean
}

export interface PhienTrinhChieu {
  maPhien: string
  maPhong: string
  maPin: string
  ngayTao: string
}

export interface BaoCao {
  id: string
  idNguoiDung: string
  idPhongTrinhChieu?: string
  idCauHoi?: string
  noiDung: string
  trangThai: 'dang_xu_ly' | 'da_xu_ly' | 'tu_choi'
  thoiGian: string
}

export interface ThanhVienPhienTrinhChieu {
  id: string
  idPhongTrinhChieu: string
  idNguoiDung: string
  tenHienThi?: string
  thoiGianThamGia: string
  diemSo: number
}

export interface CauTraLoi {
  id: string
  idCauHoi: string
  idNguoiDung: string
  idPhongTrinhChieu: string
  dapAnDuocChon: string
  thoiGianTraLoi: string
  dungHaySai: boolean
}
