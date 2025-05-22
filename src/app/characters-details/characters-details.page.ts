import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [CommonModule, IonicModule,FormsModule],
  templateUrl: './characters-details.page.html',
  styleUrls: ['./characters-details.page.scss']
})
export class CharacterDetailsPage implements OnInit {
  character: any;
  comment: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private firestore: Firestore,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(`https://rickandmortyapi.com/api/character/${id}`).subscribe((data) => {
      this.character = data;
    });
  }

  async saveComment() {
    if (!this.comment.trim()) return;

    try {
      const commentCollection = collection(this.firestore, 'Informacion Personaje');

      await addDoc(commentCollection, {
        character: this.character,
        comentario: this.comment.trim(),
        timestamp: new Date()
      });

      this.comment = '';

      const toast = await this.toastController.create({
        message: 'Comentario guardado correctamente.',
        duration: 2000,
        color: 'success'
      });
      await toast.present();
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Error al guardar el comentario.',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
      console.error('Error al guardar comentario:', error);
    }
  }
}
