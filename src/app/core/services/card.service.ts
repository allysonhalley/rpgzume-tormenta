import axios from 'axios';
import { Injectable } from '@angular/core';
import { Card } from '../models/models';

const API_BASE_URL = '/api/cards';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  async getAllCards(page = 0, size = 20) {
    return axios.get(`${API_BASE_URL}?page=${page}&size=${size}`);
  }

  async getCardById(id: string) {
    return axios.get(`${API_BASE_URL}/${id}`);
  }

  async createCard(cardData: Card) {
    return axios.post(`${API_BASE_URL}`, cardData);
  }

  async updateCard(id: string, cardData: Card) {
    return axios.put(`${API_BASE_URL}/${id}`, cardData);
  }

  async deleteCard(id: string) {
    return axios.delete(`${API_BASE_URL}/${id}`);
  }
}
