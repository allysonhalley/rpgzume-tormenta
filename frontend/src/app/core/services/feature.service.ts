import axios from 'axios';
import { Injectable } from '@angular/core';
import { Feature } from '../models/models';

const API_BASE_URL = '/api/features';

@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  async getAllFeatures() {
    return axios.get(`${API_BASE_URL}`);
  }

  async getFeatures() {
    return this.getAllFeatures();
  }

  async getFeatureById(id: string) {
    return axios.get(`${API_BASE_URL}/${id}`);
  }

  async createFeature(featureData: Feature) {
    return axios.post(`${API_BASE_URL}`, featureData);
  }

  async updateFeature(id: string, featureData: Feature) {
    return axios.put(`${API_BASE_URL}/${id}`, featureData);
  }

  async deleteFeature(id: string) {
    return axios.delete(`${API_BASE_URL}/${id}`);
  }
}
