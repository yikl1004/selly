/** node 환경 변수 */
namespace NodeJS {
    interface ProcessEnv {
        // API URL 정보
        VUE_APP_API_DOMAIN: string
        // 카카오 SDK API key
        VUE_APP_KAKAO_API_KEY: string
        // 카카오 SDK 재설정 API key
        VUE_APP_KAKAO_REST_API_KEY: string
        // 도로명 주소 API KEY
        VUE_APP_JUSO_API_KEY: string
        // DEV: 로그인절차 생략 처리 플래그
        VUE_APP_SKIP_LOGIN: string
    }
}
