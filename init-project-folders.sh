npm install --save jquery bootstrap font-awesome animate.css @angular/material @angular/cdk @angular/animations hammerjs ngx-toastr ngx-cookie-service  &&

ng g s application/services/app &&
ng g s application/services/login-auth &&
ng g c four-o-four &&
ng g c not-allowed &&
ng g c login &&
ng g c forgot-password &&
ng g c set-password &&
ng g c message &&
ng g m "application/modules/${1}" &&

mkdir src/assets/imgs &&
mkdir src/styles &&
touch src/styles/reset.scss &&
touch src/styles/colors.scss &&
touch src/styles/measures.scss &&
touch src/styles/vars.scss &&
touch src/styles/text.scss &&
touch src/styles/elements.scss &&
touch src/styles/styles.scss