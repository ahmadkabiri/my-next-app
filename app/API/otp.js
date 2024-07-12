"use server";

export async function logOtpActions(title, data) {
  try {
    console.log(title, data);

    return;
  } catch (error) {
    return error;
  }
}
const CallApi = async ({ url, baseUrl, options }) => {
  try {
    const response = await fetch(`${baseUrl}/${url}`, {
      ...options,
      body: JSON.stringify(options.body),
      headers: {
        ...options?.headers,
        "Content-Type": "application/json",
      },
    });

    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export async function VerifyOtpLoginAction(phoneNumber, code) {
  try {
    const response = await CallApi({
      baseUrl: "http://auth.aneaCloud.ir/AuthService.svc",
      url: "otplogin",
      options: {
        method: "post",
        body: {
          Service: "AutomationWeb",
          UserName: phoneNumber,
          OTP: code,
        },
      },
    });

    const { AccessToken, RefreshToken } = response;
    cookies().set({
      name: "zugang",
      value: AccessToken,
      path: "/",
      httpOnly: true,
      maxAge: JWT.decode(AccessToken).exp - Math.floor(Date.now() / 1000),
    });
    cookies().set({
      name: "aktualisierung",
      value: encryptRefreshToken(RefreshToken),
      maxAge: JWT.decode(RefreshToken).exp - Math.floor(Date.now() / 1000),
      path: "/",
      httpOnly: true,
    });
    return response;
  } catch (error) {
    return error;
  }
}
