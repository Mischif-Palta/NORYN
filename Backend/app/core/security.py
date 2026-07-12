from passlib.context import CryptContext #CryptContext hashes passwords

pwd_context = CryptContext(schemes=["bcrypt"],
                           deprecated= "auto") #bcrypt is a encryption algorithm

def hash_password(password : str): #Converts password into hash code
    return pwd_context.hash(password)

def verify_password(plain_password : str, hashed_password : str): #Verfies if the password matches the encrypted password
    return pwd_context.verify(plain_password, hashed_password)

