package main

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"server/models"
	"time"

	jwt "github.com/pascaldekloe/jwt"
	"golang.org/x/crypto/bcrypt"
)

var validUser = models.User{
	ID:       10,
	Email:    "notfromdb@email.com",
	Password: "$2a$12$XESHKPv/WGxRGZdrcxStZeDBr5eURVp6vY/OktGaERaZ3uByRFltu",
}

type Credentials struct {
	Username string `json:"email"`
	Password string `json:"password"`
}

// https://go.dev/play/p/uKMMCzJWGsW
// Generate manually
func getHashedPassword() {
	password := "password"

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(password), 12)

	fmt.Println(string(hashedPassword))
}

// https://go.dev/play/p/s8KlqJIOWej
// Generate manually
func getJWTSecret() {

	secret := "mysecret"
	data := "data"
	fmt.Printf("Secret: %s Data: %s\n", secret, data)

	// Create a new HMAC by defining the hash type and the key (as byte array)
	h := hmac.New(sha256.New, []byte(secret))

	// Write Data to it
	h.Write([]byte(data))

	// Get result and encode as hexadecimal string
	sha := hex.EncodeToString(h.Sum(nil))

	fmt.Println("Result: " + sha)
}

func (app *application) Signin(w http.ResponseWriter, r *http.Request) {
	var c Credentials
	err := json.NewDecoder(r.Body).Decode(&c)
	if err != nil {
		app.errorJSON(w, errors.New("invalid credentials"))
		return
	}

	hashedPassword := validUser.Password
	err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(c.Password))
	if err != nil {
		app.errorJSON(w, errors.New("invalid credentials"))
		return
	}

	var claims jwt.Claims
	claims.Subject = fmt.Sprint(validUser.ID)
	claims.Issued = jwt.NewNumericTime(time.Now())
	claims.NotBefore = jwt.NewNumericTime(time.Now())
	claims.Expires = jwt.NewNumericTime(time.Now().Add(24 * time.Hour))
	claims.Issuer = "mydomain.com"
	claims.Audiences = []string{"mydomain.com"}

	jwtBytes, err := claims.HMACSign(jwt.HS256, []byte(app.config.jwt.secret))
	if err != nil {
		app.errorJSON(w, errors.New("error signing"))
		return
	}

	app.writeJSON(w, http.StatusOK, string(jwtBytes), "res")
}
