var app = new Vue({
    el: "#app",
    data: {
        lang: { name: "", code: "" },
        isLoading: false,
        isError: false,
        error: "",
        duration: 1,
        option: '',
        amount: 0
    },
    created: async function () {
        langs.getSelected()
            .then(lang => {
                this.lang = lang;
                document.title = lang.CART
            });

        this.calPrice()
        OmiseCard.configureButton("#checkout-button", {
            publicKey: "OMISE_PUBLIC_KEY",
            amount: 10000,
            frameLabel: "Merchant Name",
            submitLabel: "Pay",
            defaultPaymentMethod: "internet_banking",
          });
          OmiseCard.configureButton("#checkout-button-alt", {
            publicKey: "OMISE_PUBLIC_KEY",
            amount: 10000,
            frameLabel: "Merchant Name",
            submitLabel: "Pay",
      
          });
    OmiseCard.attach();


    },
    methods: {
        selectLang: function () {
            langs.selectLanguage(this.lang.code);
            langs.getSelected()
                .then(lang => {
                    this.lang = lang;
                    document.title = lang.CART
                });
        },
        editCart: function (num) {
            n = parseInt(this.duration)

            if (num == 1) {
                this.duration = n - 1
                app.calPrice()
            }
            else {
                this.duration = n + 1
                app.calPrice()
            }
        },
        calPrice: function () {
            let n = parseInt(this.duration)
            if (this.option === "Months") {

                this.amount = n * 100
            } else if (this.option === "Years") {
                this.amount = n * (100 * 12)
            }
        }
    },
});




