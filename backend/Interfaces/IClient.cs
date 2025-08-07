namespace SimpleChat.Interfaces;

public interface IClient
{
    public Task GetMessage(string user, string message);
}