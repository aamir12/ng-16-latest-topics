import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

interface IResourceOBJ {
  id?:number;
}

type ResourceType<T> =  T & IResourceOBJ;

export class ResourceService<T> {
  http = inject(HttpClient);
  resources = signal<ResourceType<T>[]>([]);

  protected upsertResource = (post: ResourceType<T>) => {
    const index = this.resources().findIndex(resource => resource.id === post.id);
    if(index === -1) {
      this.resources.set([...this.resources(),post])
    }else {
      this.resources.update((resources) => {
        resources[index] = post;
        return resources;
      });
    }
  }

  protected removeResource = (id: number) => {
    this.resources.set(
      this.resources().filter((resource) => resource.id !== id)
    );
  };

  protected setResources = (resources: ResourceType<T>[]) => {
    this.resources.set(resources);
  };


}
