import axios from 'axios';
import { Injectable } from '@angular/core';
import { Magic } from '../models/models';

import { environment } from '../../../environments/environment';

const API_BASE_URL = `${environment.apiUrl}/magics`;

@Injectable({
  providedIn: 'root',
})
export class MagicService {
  async getAllMagics() {
    return axios.get(`${API_BASE_URL}`);
  }

  async getMagicById(id: string) {
    return axios.get(`${API_BASE_URL}/${id}`);
  }

  async createMagic(magicData: Magic) {
    return axios.post(`${API_BASE_URL}`, magicData);
  }

  async updateMagic(id: string, magicData: Magic) {
    return axios.put(`${API_BASE_URL}/${id}`, magicData);
  }

  async deleteMagic(id: string) {
    return axios.delete(`${API_BASE_URL}/${id}`);
  }
}
