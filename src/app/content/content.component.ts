import { Component } from '@angular/core';
import { AxiosService } from '../axios.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
	componentToShow: string = "welcome";
	errorMessage: string | null = null; // Variável para mensagem de erro


	constructor(private axiosService: AxiosService) { }

	showComponent(componentToShow: string): void {
    this.componentToShow = componentToShow;
  }

	onLogin(input: any): void {
		this.axiosService.request(
		    "POST",
		    "/login",
		    {
		        login: input.login,
		        password: input.password
		    }).then(response => {
				this.axiosService.setAuthToken(response.data.token);
				this.componentToShow = "messages";
				this.errorMessage = null; // Limpa mensagem de erro em caso de sucesso
			}).catch(error => {
				this.axiosService.setAuthToken(null);
				this.componentToShow = "welcome";
				this.errorMessage = error.response?.data?.message || "Ocorreu um erro ao fazer login."; // Exibe a mensagem do backend ou uma mensagem padrão
				
				// Limpa a mensagem após 5 segundos
				setTimeout(() => {
					this.errorMessage = null;
				}, 3000); // 5000 milissegundos = 5 segundos
			});
		}

	onRegister(input: any): void {
		this.axiosService.request(
		    "POST",
		    "/register",
		    {
		        firstName: input.firstName,
		        lastName: input.lastName,
		        login: input.login,
		        password: input.password
		    }).then(response => {
				this.axiosService.setAuthToken(response.data.token);
				this.componentToShow = "messages";
				this.errorMessage = null; // Limpa mensagem de erro em caso de sucesso
			}).catch(error => {
				this.axiosService.setAuthToken(null);
				this.componentToShow = "welcome";
				this.errorMessage = error.response?.data?.message || "Ocorreu um erro ao registrar."; // Exibe a mensagem do backend ou uma mensagem padrão
				
				// Limpa a mensagem após 5 segundos
				setTimeout(() => {
					this.errorMessage = null;
				}, 3000); // 5000 milissegundos = 5 segundos
			});
		}
	}