import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AppService {
  public BASE_URL = "http://localhost:5500";

  public LOGGED_IN_USER = "loggedInUSer";
  public LOGGED_IN_USER_TOKEN = "loggedInUSerToken";
  public CURRENT_MERCHANT = "currentMerchant";

  public emailRegex: RegExp = RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  );
  public phoneRegex: RegExp = RegExp(/^\d{4}\d{3}\d{4}$/);
  public nubanRegex: RegExp = RegExp(/^\d{4}\d{3}\d{3}$/);

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private toast: ToastrService,
    private router: Router
  ) {}

  /**
   * Makes get request with ot without headers
   */
  public makeGetRequest(url: string, headers?: HttpHeaders) {
    if (headers == null || headers == undefined) {
      return this.http.get(url);
    } else {
      return this.http.get(url, { headers: headers });
    }
  }

  /**
   * Makes get request with ot without headers
   */
  public makeGetRequestWithParams(
    url: string,
    headers?: HttpHeaders,
    params?: HttpParams
  ) {
    if (headers == null || headers == undefined) {
      return this.http.get(url, { params });
    } else {
      return this.http.get(url, { headers: headers, params: params });
    }
  }

  /**
   * Makes post request with or without headers
   * @param url
   * @param body
   * @param headers
   */
  public makePostRequest(url: string, body: any, headers?: HttpHeaders): any {
    if (headers == null || headers == undefined) {
      return this.http.post(url, body);
    } else {
      return this.http.post(url, body, { headers });
    }
  }

  /**
   * Makes Put request with or without Headers
   * @param url
   * @param body
   * @param headers
   */
  public makePutRequest(url: string, body: any, headers?: HttpHeaders): any {
    if (headers == null || headers == undefined) {
      return this.http.put(url, body);
    } else {
      return this.http.put(url, body, { headers });
    }
  }

  public saveLoggedInUser = (user: any): void => {
    if (user !== null || user !== undefined) {
      this.cookieService.set(this.LOGGED_IN_USER, JSON.stringify(user));
      this.router.navigate(["/dashboard"]);
    } else {
    }
  };

  public getLoggedInUser = (): any => {
    if (this.cookieService.check(this.LOGGED_IN_USER)) {
      let cookieData = this.cookieService.get(this.LOGGED_IN_USER);
      return JSON.parse(cookieData);
    } else {
      return {};
    }
  };

  public getLoggedInUserDatails = (): any => {
    if (this.cookieService.check(this.LOGGED_IN_USER)) {
      let cookieData = this.cookieService.get(this.LOGGED_IN_USER);

      let user: any = JSON.parse(cookieData);

      if (user.hasOwnProperty("portalUser")) {
        return user.portalUser;
      }
    } else {
      return {};
    }
  };

  public saveLoggedInUserToken = (token: any): void => {
    if (token !== null || token !== undefined) {
      this.cookieService.set(this.LOGGED_IN_USER_TOKEN, token);
    } else {
    }
  };

  public getLoggedInUserToken = (): string => {
    if (this.cookieService.check(this.LOGGED_IN_USER_TOKEN)) {
      let cookieData = this.cookieService.get(this.LOGGED_IN_USER_TOKEN);

      return "Bearer " + cookieData;
    } else {
      return null;
    }
  };

  public logout = (): void => {
    this.cookieService.delete(this.LOGGED_IN_USER);
    this.router.navigate(["/"]);
  };

  public setCurrentMerchant = (merchant: any): void => {
    this.cookieService.set(this.CURRENT_MERCHANT, JSON.stringify(merchant));
  };

  public getCurrentMerchant = (): void => {
    if (this.cookieService.check(this.CURRENT_MERCHANT)) {
      let cookieData = this.cookieService.get(this.CURRENT_MERCHANT);
      return JSON.parse(cookieData);
    } else {
      return null;
    }
  };

  public showSuccessMessage(message): void {
    if (message !== null || message !== undefined) {
      this.toast.success(message, "Process Complete.");
    }
  }

  public showErrorMessage(message): void {
    if (message !== null || message !== undefined) {
      this.toast.error(message, "Process Error.");
    }
  }

  public showWarningMessage(message): void {
    if (message !== null || message !== undefined) {
      this.toast.warning(message, "Warning.");
    }
  }
}
