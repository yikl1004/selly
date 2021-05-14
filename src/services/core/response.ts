/**
 *
 * @export
 * @interface MRKINFVO
 */
export interface MRKINFVO {
    /**
     * 마케팅가맹점명
     * @type {string}
     * @memberof MRKINFVO
     */
    mcNm?: string
    /**
     * 마케팅정보(혜택고객)
     * @type {string}
     * @memberof MRKINFVO
     */
    mrktBnfPrs?: string
    /**
     * 마케팅정보(종료일)
     * @type {string}
     * @memberof MRKINFVO
     */
    mrktEdt?: string
    /**
     * 마케팅정보(행사명)
     * @type {string}
     * @memberof MRKINFVO
     */
    mrktEvNm?: string
    /**
     * 마케팅정보(시작일)
     * @type {string}
     * @memberof MRKINFVO
     */
    mrktSdt?: string
    /**
     * 마케팅정보(마케팅상태)
     * @type {string}
     * @memberof MRKINFVO
     */
    mrktStc?: string
    /**
     * 마케팅정보(총인원)
     * @type {string}
     * @memberof MRKINFVO
     */
    mrktTotal?: string
}
/**
 *
 * @export
 * @interface SEAARVO
 */
export interface SEAARVO {
    /**
     * 결과코드
     * @type {string}
     * @memberof SEAARVO
     */
    rc?: string
    /**
     * 결과메시지
     * @type {string}
     * @memberof SEAARVO
     */
    rsMsg?: string
    /**
     * test
     * @type {string}
     * @memberof SEAARVO
     */
    test?: string
}
/**
 *
 * @export
 * @interface SEFINAARVO
 */
export interface SEFINAARVO {
    /**
     * 연이자
     * @type {number}
     * @memberof SEFINAARVO
     */
    eyLoI?: number
    /**
     * 결과코드
     * @type {string}
     * @memberof SEFINAARVO
     */
    rc?: string
    /**
     * 결과메시지
     * @type {string}
     * @memberof SEFINAARVO
     */
    rsMsg?: string
    /**
     * sttAcno
     * @type {string}
     * @memberof SEFINAARVO
     */
    sttAcno?: string
    /**
     * 대출이용가능금액
     * @type {string}
     * @memberof SEFINAARVO
     */
    upsAm?: string
}
/**
 *
 * @export
 * @interface SELGNAA001RVO
 */
export interface SELGNAA001RVO {
    /**
     * 사업자번호기입여부
     * @type {string}
     * @memberof SELGNAA001RVO
     */
    mbrBzRegYn?: string
    /**
     * 회원가입여부
     * @type {string}
     * @memberof SELGNAA001RVO
     */
    mbrYn?: string
    /**
     * 결과코드
     * @type {string}
     * @memberof SELGNAA001RVO
     */
    rc?: string
    /**
     * 결과메시지
     * @type {string}
     * @memberof SELGNAA001RVO
     */
    rsMsg?: string
}
/**
 *
 * @export
 * @interface SELGNAA003RVO
 */
export interface SELGNAA003RVO {
    /**
     * bannInf
     * @type {string}
     * @memberof SELGNAA003RVO
     */
    bannInf?: string
    /**
     * resultDc
     * @type {string}
     * @memberof SELGNAA003RVO
     */
    resultDc: string
    /**
     * url
     * @type {string}
     * @memberof SELGNAA003RVO
     */
    url?: string
}
/**
 *
 * @export
 * @interface SELMAIAA001RVO
 */
export interface SELMAIAA001RVO {
    /**
     * 대표자이름
     * @type {string}
     * @memberof SELMAIAA001RVO
     */
    dgNm?: string
    /**
     * 로카코인
     * @type {number}
     * @memberof SELMAIAA001RVO
     */
    locaCoin?: number
    /**
     * 마케팅정보리스트
     * @type {Array<MRKINFVO>}
     * @memberof SELMAIAA001RVO
     */
    mrkInfList?: Array<MRKINFVO>
    /**
     * 결과코드
     * @type {string}
     * @memberof SELMAIAA001RVO
     */
    rc?: string
    /**
     * 결과메시지
     * @type {string}
     * @memberof SELMAIAA001RVO
     */
    rsMsg?: string
    /**
     * 매출스크랩핑동의여부
     * @type {string}
     * @memberof SELMAIAA001RVO
     */
    scrapAgYn?: string
    /**
     * 매출정보리스트
     * @type {Array<SLINFVO>}
     * @memberof SELMAIAA001RVO
     */
    slInfList?: Array<SLINFVO>
    /**
     * 전일총매출
     * @type {string}
     * @memberof SELMAIAA001RVO
     */
    totalSl?: string
}
/**
 *
 * @export
 * @interface SLINFVO
 */
export interface SLINFVO {
    /**
     * 날짜
     * @type {string}
     * @memberof SLINFVO
     */
    date?: string
    /**
     * 날짜별매출
     * @type {string}
     * @memberof SLINFVO
     */
    slInf?: string
}
