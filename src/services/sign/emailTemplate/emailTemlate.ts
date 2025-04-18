const generateVerificationEmail = (email: string) => {
  return `
      <!DOCTYPE html>
      <html lang="ko">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>PlayHive 인증 메일</title>
        </head>
        <body style="margin:0; padding:0; font-family:'SUIT Variable', sans-serif">
          <section style="max-width:728px; margin:0 auto; background:white; padding:80px 40px 0; border-radius:8px;">
            <div style="display:flex; flex-direction:column; gap:24px;">
              <div style="width:475px; display:flex; gap:16px; align-items:center;">
                <img src="https://yourdomain.com/images/logo.svg" alt="PlayHive Logo" style="height:32px; object-fit:cover;" />
                <p style="color:#00adee; font-size:14px; margin:0;">
                  모두 함께 즐기는 클린 스포츠 커뮤니티, 플레이 하이브!
                </p>
              </div>
  
              <div style="max-width:490px; display:flex; flex-direction:column; gap:8px;">
                <h5 style="font-size:28px; font-weight:700; line-height:40px; letter-spacing:-0.04em; color:#222; margin:0; white-space:nowrap;">
                  플레이하이브 회원가입을 위한 이메일 인증번호
                </h5>
                <p style="font-size:14px; font-weight:500; line-height:20px; color:#424242; margin:0;">
                  안녕하세요, <strong>${email}</strong> 님,<br />
                  5분 이내로 아래 인증 번호를 입력하여 이메일 주소 인증을 완료하세요.
                </p>
              </div>
  
              <div>
                <div style="margin-bottom:4px; color:#444;">
                  <span style="font-weight:700; font-size:20px; line-height:36px; letter-spacing:-0.02em;">인증 번호</span>&nbsp;
                  <span style="font-weight:500; font-size:20px; line-height:36px; letter-spacing:-0.02em;">인증 시간 제한 5:00</span>
                </div>
                <div style="font-size:40px; font-weight:bold; color:#00adee; background:#f2faff; padding:16px; margin-bottom:24px;">
                  {code}
                </div>
  
                <p style="margin:24px 0 40px; font-size:14px; color:#424242;">
                  본 메일은 발신전용입니다. 자세한 사항은 
                  <a href="https://playhive.com/customer-service" style="color:#00aaee; text-decoration:underline;">
                    플레이하이브 고객센터
                  </a>를 이용하세요.
                </p>
              </div>
            </div>
          </section>
  
          <footer style="background:#000; color:white; padding:40px 40px 0; font-size:12px;">
            <div style="max-width:638px; margin:0 auto;">
              <div style="display:flex; flex-direction:column; gap:24px;">
                <div style="width:148px; height:40px; display:flex; justify-content:center; align-items:center;">
                  <img src="https://playhive.com/images/logo.png" alt="PlayHive" style="width:100%; height:100%; object-fit:cover;" />
                </div>
                <p style="font-weight:500; font-size:24px; line-height:38px; letter-spacing:-0.04em; margin:0;">
                  열정적으로 응원하고 서로를 존중하며<br />
                  <span style="font-weight:700;">모두 함께 즐기는 클린 스포츠 커뮤니티, 플레이 하이브!</span>
                </p>
                <p style="font-weight:500; font-size:16px; line-height:24px; letter-spacing:-0.02em; color:#a6a6a6; margin:0;">
                  서비스명: PlayHive · 대표: 홍길표 · 개인정보 보호책임자: 홍길표<br />
                  콘텐츠 내용에 대한 저작권 및 법적 책임은 자료제공자 또는 글쓴이에 있으며 PlayHive의 입장과 다를 수 있습니다.
                </p>
              </div>
              <div style="height:80px; color:#a6a6a6; display:flex; align-items:center; margin-top:24px;">
                <p style="font-weight:500; font-size:16px; line-height:24px; letter-spacing:-0.02em; margin:0;">
                  Copyright ⓒ PlayHive Co., Ltd All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </body>
      </html>
    `;
};

export default generateVerificationEmail;
