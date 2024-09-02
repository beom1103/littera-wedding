import { BaseSection, InvitationType } from "../invitation/invitation";

export enum WeddingSectionType {
  Common = "common",
  Share = "share",
  Bgm = "bgm",
  Cover = "cover",
  InvitationNote = "invitation-note",
  Gallery = "gallery",
  Guestbook = "guestbook",
  Rsvp = "rsvp",
  Calendar = "calendar",
  Direction = "direction",
  Transportation = "transportation",
  Contact = "contact",
  Notice = "notice",
  Quote = "quote",
  Video = "video",
  SpecialLink = "special-link",
  Venue = "venue",
  CoupleInfo = "couple-info",
  WeddingDay = "wedding-day",
}

// 공통 섹션
interface CommonSection extends BaseSection<InvitationType.Wedding> {
  type: WeddingSectionType.Common;
  name: string;
  path: string;
  fontFamily: string;
  fontSize: string;
  isBackgroundEffect: boolean;
  backgroundImage: string;
  isScrollEffect: boolean;
  isZoomAvailable: boolean;
  theme: string;
}

// 공유 섹션
interface ShareSection extends BaseSection<InvitationType.Wedding> {
  type: WeddingSectionType.Share;
  smsTitle: string;
  smsDescription: string;
  smsImage: string;
  kakaoTitle: string;
  kakaoDescription: string;
  kakaoImage: string;
}

// BGM 섹션
interface BgmSection extends BaseSection<InvitationType.Wedding> {
  type: WeddingSectionType.Bgm;
  isCustom: boolean;
  musicId: string;
  isAutoPlay: boolean;
}

// 커버 섹션
interface CoverSection extends BaseSection<InvitationType.Wedding> {
  type: WeddingSectionType.Cover;
  coverMessage: string;
  coverType: string;
  isColorUsed: boolean;
  isIntroUsed: boolean;
  isIntroOpacity: boolean;
  introType: string;
  introColor: string;
  introBackground: string | null;
  textColor: string;
  imageBrightness: number;
}

// 초대의 글 섹션
interface InvitationNoteSection extends BaseSection<InvitationType.Wedding> {
  type: WeddingSectionType.InvitationNote;
  decoration: string;
  content: string;
  isNameDisplayed: boolean;
  isImageUploaded: boolean;
}

// 갤러리 섹션
interface GallerySection extends BaseSection<InvitationType.Wedding> {
  type: WeddingSectionType.Gallery;
  title: string;
  description: string;
  designType: string;
  gridColumn: number;
  thumbRatio: string;
  isViewer: boolean;
  isSlider: boolean;
  sliderType: string;
  isBrief: boolean;
}

// 방명록 섹션
interface GuestbookSection extends BaseSection<InvitationType.Wedding> {
  type: WeddingSectionType.Guestbook;
  // 방명록 관련 필드
}

// RSVP 섹션
interface RsvpSection extends BaseSection<InvitationType.Wedding> {
  type: WeddingSectionType.Rsvp;
  // RSVP 관련 필드
}

// 캘린더 섹션
interface CalendarSection extends BaseSection<InvitationType.Wedding> {
  type: WeddingSectionType.Calendar;
  // 캘린더 관련 필드
}

// 오시는 길 섹션
interface DirectionSection extends BaseSection<InvitationType.Wedding> {
  type: WeddingSectionType.Direction;
  // 오시는 길 관련 필드
}

// 교통 정보 섹션
interface TransportationSection extends BaseSection<InvitationType.Wedding> {
  type: WeddingSectionType.Transportation;
  // 교통 정보 관련 필드
}

// 연락처 섹션
interface ContactSection extends BaseSection<InvitationType.Wedding> {
  type: WeddingSectionType.Contact;
  // 연락처 정보 관련 필드
}

// 공지사항 섹션
interface NoticeSection extends BaseSection<InvitationType.Wedding> {
  type: WeddingSectionType.Notice;
  title: string | null;
  description: string | null;
  designType: string;
  noticeContent: NoticeItem[];
}

interface NoticeItem {
  id: string;
  content: string;
}

// 인용구 섹션
interface QuoteSection extends BaseSection<InvitationType.Wedding> {
  type: WeddingSectionType.Quote;
  content: string;
  isImageUploaded: boolean;
  bgColor: string;
}

// 비디오 섹션
interface VideoSection extends BaseSection<InvitationType.Wedding> {
  type: WeddingSectionType.Video;
  // 비디오 관련 필드
}

// 특별 링크 섹션
interface SpecialLinkSection extends BaseSection<InvitationType.Wedding> {
  type: WeddingSectionType.SpecialLink;
  header: string;
  title: string;
  description: string;
  linkUrl: string;
  linkName: string;
  backgroundColor: string;
  buttonColor: string;
  headerColor: string;
  contentColor: string;
}

// 베뉴 정보 섹션
interface VenueSection extends BaseSection<InvitationType.Wedding> {
  type: WeddingSectionType.Venue;
  venueName: string;
  venueDetail: string;
  contact: string;
  address: string;
  lat: number;
  lng: number;
}

// 커플 정보 섹션
interface CoupleInfoSection extends BaseSection<InvitationType.Wedding> {
  type: WeddingSectionType.CoupleInfo;
  groomFirstName: string;
  groomLastName: string;
  brideFirstName: string;
  brideLastName: string;
  groomParents: ParentInfo;
  brideParents: ParentInfo;
  isNicknameUsed: boolean;
  groomNickname: string;
  brideNickname: string;
}

interface ParentInfo {
  fatherFirstName: string;
  fatherLastName: string;
  motherFirstName: string;
  motherLastName: string;
  fatherRelation: string;
  motherRelation: string;
  isFatherDeceased: boolean;
  isMotherDeceased: boolean;
  fatherDeceasedIcon: string | null;
  motherDeceasedIcon: string | null;
}

// 결혼식 날짜 섹션
interface WeddingDaySection extends BaseSection<InvitationType.Wedding> {
  type: WeddingSectionType.WeddingDay;
  date: Date;
  displayFormat: string;
}

export type WeddingInvitationSection =
  | CommonSection
  | ShareSection
  | BgmSection
  | CoverSection
  | InvitationNoteSection
  | GallerySection
  | GuestbookSection
  | RsvpSection
  | CalendarSection
  | DirectionSection
  | TransportationSection
  | ContactSection
  | NoticeSection
  | QuoteSection
  | VideoSection
  | SpecialLinkSection
  | VenueSection
  | CoupleInfoSection
  | WeddingDaySection;
