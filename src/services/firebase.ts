import {Injectable} from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable()
export class Firebase {

    constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {}

    register(email: string, password: string) {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(this.validateError(error));
            });
        });
    }

    login(email: string, password: string) {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(this.validateError(error));
            });
        });
    }

    createUserDb(idUser: string, data: any) {
        return new Promise((resolve, reject) => {
            this.afs
            .collection('users')
            .doc(idUser)
            .set(data)
            .then(() => resolve(true))
            .catch((error) => {
                reject(error);
            });
        });
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    getAuthInfoUser() {
        return this.afAuth.auth.currentUser;
    }

    getUserDb(idUser) {
        console.log(idUser)
        return this.afs
        .collection('users')
        .doc(idUser)
        .valueChanges();
    }

    updateUser(idUser: string, data: any) {
        return new Promise((resolve, reject) => {
            this.afs
            .collection('users')
            .doc(idUser)
            .update(data)
            .then(() => resolve())
            .catch((error) => reject(error));
        });
    }

    getStay(idStay) {
        return this.afs
        .collection('stays')
        .doc(idStay)
        .valueChanges();
    }

    startStay(data: any) {
        return new Promise((resolve, reject) => {
            this.afs
            .collection('stays')
            .add(data)
            .then((result) => resolve(result))
            .catch((error) => reject(error));
        });
    }

    updateStay(idStay, data) {
        return new Promise((resolve, reject) => {
            this.afs
            .collection('stays')
            .doc(idStay)
            .update(data)
            .then(() => resolve())
            .catch((error) => reject(error));
        }); 
    }

    private validateError(error) {
        let msg = "";
        switch(error.code) {
            case 'auth/email-already-in-use':
                msg = "El email ya esta en uso";
                break;
            case 'auth/invalid-email':
                msg = "El email es invalido";
                break;
            case 'auth/weak-password':
                msg = "La constraseña no es segura";
                break;
            case 'auth/user-not-found':
                msg = "El usuario no existe";
                break;
            case 'auth/wrong-password':
                msg = "La contraseña es incorrecta";
                break;    
            default:
                msg = error;
        }
        return msg;
    }
}